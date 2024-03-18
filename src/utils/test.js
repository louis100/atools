function text() {
    let csharpCode = `
  // 这是一个C#单行注释
  /* 这是一个
  多行C#注释 */
  public string CSharp {get; set;} 
  `
    csharpCode = csharpCode.trim();
    console.log('csharpCode:', csharpCode)
    // let typescriptCode = csharpCode.replace(/\/\*([\s\S]*?)\*\//g, '/**$1**/')
    // const regex = /(\/\*[\s\S]*?\*\/)/g
    // const match = regex.exec(csharpCode);
    // console.log('match:', match)
    // console.log('csharpCode:', typescriptCode)
    const regex = /\/\*([\s\S]*?)\*\//g// /([^\/\/*|^\/\**|^\*\\])/g

    const istest = regex.test(csharpCode)

    const match = regex.exec(csharpCode)

    console.log('match:', istest, match)



}

// text()

(function text2() {
    let csharpCode = `
  // 这是一个C#单行注释
  /* 这是一个
  多行C#注释 */
  public string CSharp {get; set;} 
  `
    const arr = csharpCode.split('\n');
    arr.forEach(line => {
        console.log('line:', line.replace(/\/\*([\s\S]*?)\*\//g, '/**$1**/'))
    })


})()