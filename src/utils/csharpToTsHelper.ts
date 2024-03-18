function mapCSharpTypeToTs(csharpType: string): string {
  // 示例映射规则，真实情况下需要处理更多情况
  switch (csharpType) {
    case 'int':
    case 'decimal':
      return 'number'
    case 'string':
      return 'string'
    case 'bool':
      return 'boolean'
    case 'DateTime':
      return 'Date'
    default:
      // throw new Error(`无法识别的C#类型：${csharpType}`)
      return csharpType
  }
}

function csharpToTs(csharpCodeline: string): string {
  // 正则匹配C#属性
  const propertyRegex = /(\w+) (\w+) \{ get; set; \}/g
  let match = propertyRegex.exec(csharpCodeline)
  if (!match || match.length == 0) {
    // console.log('classMatch:', match)
    return ''
  }

  const typeName = match[1]
  const propertyName = match[2]
  let type = mapCSharpTypeToTs(typeName)
  return `  ${propertyName}?: ${type};\n`
  // while ((match = propertyRegex.exec(csharpCodeline)) !== null) {
  //   const typeName = match[1]
  //   const propertyName = match[2]
  //   let type = mapCSharpTypeToTs(typeName)
  //   tsInterfaceContent += `  ${propertyName}?: ${type};\n`
  // }
}

/**
 *
 * @param csharpCodeline
 * @returns
 */
function csharpToTsProp(csharpCodeline: string): Api.Custom.VMPropInfo | undefined {
  // 正则匹配C#属性
  const propertyRegex = /(\w+) (\w+) \{ get; set; \}/g
  let match = propertyRegex.exec(csharpCodeline)
  if (!match || match.length == 0) {
    return undefined
  }

  const typeName = match[1]
  const propertyName = match[2]
  let type = mapCSharpTypeToTs(typeName)
  return {
    propName: propertyName,
    propType: typeName
  }
}

function keepComments(csharpCodeline: string): string {
  return csharpCodeline.replace(/\/\*([\s\S]*?)\*\//g, '/**$1**/')
  // let tsCode = ''
  // const propertyRegex = /(\/\/\w+)/g
  // let match = propertyRegex.exec(csharpCodeline)
  // // 检查是否是C#的单行注释
  // if (csharpCodeline.startsWith('//')) {
  //   // 如果是C#的单行注释，转换为TypeScript的单行注释
  //   tsCode += `// ${csharpCodeline.substring(2).trim()}\n`
  // } else if (!csharpCodeline.startsWith('/*') && !csharpCodeline.endsWith('*/')) {
  //   // 如果不是C#的多行注释的开始或结束，直接添加该行
  //   tsCode += csharpCodeline + '\n'
  // }
  // return tsCode
}

function isComment(line: string) {
  line = line.trim()
  return (
    line.startsWith('//') || line.startsWith('/*') || line.startsWith('*') || line.endsWith('*/')
  )
}

function toTsComment(line: string) {
  line = line.trim()
  if (line.startsWith('/// <summary>') || line.startsWith('/// </summary>')) {
    return ''
  }
  return line + '\n'
}

function toTsComment2(line: string) {
  line = line.trim()
  if (line.startsWith('/// <summary>') || line.startsWith('/// </summary>')) {
    return ''
  }
  return line.replace('///', '')
}

function convertCsharpToTs(csharpClassContent: string) {
  let lines = csharpClassContent.split('\n')
  let tsInterfaceContent = ''

  const classRegex = / class (\w+)/g

  for (let line of lines) {
    // 移除行尾的空白字符
    line = line.trimEnd()

    const classMatch = classRegex.exec(line)
    if (classMatch && classMatch.length > 0) {
      const interfaceName = classMatch && classMatch.length > 1 ? classMatch[1] : 'myinterface'
      tsInterfaceContent += `interface ${interfaceName} {\n`
      // } else if (line.startsWith('}')) {
      //   tsInterfaceContent += `}`
    } else if (isComment(line)) {
      tsInterfaceContent += toTsComment(line)
    } else {
      tsInterfaceContent += csharpToTs(line)
    }
    // tsInterfaceContent += '\n'
  }

  tsInterfaceContent += '}'
  return tsInterfaceContent
}

/**
 *
 * @param csharpClassContent
 * @returns
 */
function getClassInfoFromCSharp(csharpClassContent: string): Api.Custom.VMClassInfo {
  const classInfo: Api.Custom.VMClassInfo = { className: '', props: [] }

  const classRegex = / class (\w+)/g

  let lines = csharpClassContent.split('\n')

  let newProp: Api.Custom.VMPropInfo = { propName: '', propType: '' }
  if (newProp && newProp.propName) {
    classInfo.props!.push(newProp)
  }

  for (let line of lines) {
    // 移除行尾的空白字符
    line = line.trimEnd()
    //
    const classMatch = classRegex.exec(line)
    if (classMatch && classMatch.length > 0) {
      classInfo.className = classMatch && classMatch.length > 1 ? classMatch[1] : 'myinterface'
    } else if (isComment(line)) {
      const strDesc = toTsComment2(line)
      if (strDesc) {
        //classInfo.className不为空，则说明已经开始读取属性了
        if (classInfo.className) {
          newProp.propDesc = strDesc
        } else {
          classInfo.classDesc = strDesc
        }
      }
    } else {
      const curProp = csharpToTsProp(line)
      if (curProp) {
        newProp = { ...newProp, ...curProp }
        classInfo.props?.push(newProp)
        newProp = { propName: '', propType: '', propDesc: '' }
      }
    }
  }

  return classInfo
}

function toTsinterface(classInfo: Api.Custom.VMClassInfo): string {
  let tsInterfaceContent = '// {0} \n'.format(classInfo.classDesc)
  tsInterfaceContent += 'interface {0} {\n'.format(classInfo.className)
  if (classInfo.props && classInfo.props.length > 0) {
    for (const curProp of classInfo.props) {
      tsInterfaceContent += '\t//{0}\n'.format(curProp.propDesc)
      tsInterfaceContent += '\t{0}? : {1};\n'.format(
        curProp.propName,
        mapCSharpTypeToTs(curProp.propType)
      )
    }
  }

  tsInterfaceContent += '}'
  return tsInterfaceContent
}

function toTableColumn(classInfo: Api.Custom.VMClassInfo): string {
  let strCols = ''
  strCols += '{\n'
  strCols += "title: '序号',\n"
  strCols += "dataIndex: 'Id',\n"
  strCols += 'render: (dom, entity, index) => {\n'
  strCols += 'return index + 1;\n'
  strCols += '},\n'
  strCols += 'hideInSearch: true,\n'
  strCols += 'hideInForm: true,\n'
  strCols += '},\n'

  if (classInfo.props && classInfo.props.length > 0) {
    for (let prop of classInfo.props) {
      strCols += '{\n'
      strCols += "title: '{0}',\n".format(prop.propDesc)
      strCols += "dataIndex: '{0}',\n".format(prop.propName)
      strCols += "valueType: 'text',\n"
      strCols += '},\n'
    }
  }

  strCols += '{\n'
  strCols += "title: '状态',\n"
  strCols += "dataIndex: 'State',\n"
  strCols += 'valueEnum: enumToValueEnum(enumState),\n'
  strCols += '},\n'
  strCols += '{\n'
  strCols += "title: '操作',\n"
  strCols += "dataIndex: 'option',\n"
  strCols += "valueType: 'option',\n"
  strCols += 'render: (_, record) => (\n'
  strCols += '<>\n'
  strCols += '<a onClick={() => onEdit(record)}>编辑</a>\n'
  strCols += "<Divider type='vertical' />\n"
  strCols += '<a onClick={() => onDel(record)}>删除</a>\n'
  strCols += '</>\n'
  strCols += '),\n'
  strCols += '},\n'
  return strCols
}

function toCloneModel(classInfo: Api.Custom.VMClassInfo): string {
  let strCode = '{0} model = new {0}();\n'.format(classInfo.className)
  if (classInfo.props && classInfo.props.length > 0) {
    for (const prop of classInfo.props) {
      strCode += 'model.{0} = item.{0} ; \n'.format(prop.propName)
    }
  }

  return strCode
}

export default {
  convertCsharpToTs,
  getClassInfoFromCSharp,
  toCloneModel,
  toTableColumn,
  toTsinterface
}
