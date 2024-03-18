namespace Api.Custom {
  interface ApiResult {
    msg?: string
    ok?: boolean
    data?: any
  }

  interface VMStatisticsCharCount {
    /**
     * 中文
     */
    zhongwen?: number
    /**
     * 英文
     */
    yingwen?: number
    /**
     * 数字
     */
    shuzi?: number
    /**
     * 中文+标点：
     */
    zbiaodian?: number
    /**
     * 中文+数字：
     */
    zishu?: number
    /**
     * 总计
     */
    numwords?: number
  }

  interface VMClassInfo {
    className: string
    classDesc?: string
    props?: VMPropInfo[]
  }

  interface VMPropInfo {
    propDesc?: string;
    propName: string;
    propType: string;
    // init: function (){

    // }
  }
}
