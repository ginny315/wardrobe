const PICKER_KEY = {
  SEASON: 'season',
  TYPE: 'type',
  POSITION: 'position',
}

const emyptForm = {
  season: [],
  type: [],
  pic: [],
  position: [],
  other: null,
  imgurl: null,
}

Page({
  data: { 
    form: emyptForm,
    PICKER_KEY,
    [`${PICKER_KEY.SEASON}Visible`]: false,
    [`${PICKER_KEY.TYPE}Visible`]: false,
    [`${PICKER_KEY.POSITION}Visible`]: false,
    pickerTitle: '我的选择',
    seasonList: [
      { label: '春秋', value: '春秋' },
      { label: '夏', value: '夏' },
      { label: '冬', value: '冬' },
    ],
    typeList: [
      { label: '上衣', value: '上衣' },
      { label: '连衣裙', value: '连衣裙' },
      { label: '半身裙', value: '半身裙' },
      { label: '裤子', value: '裤子' },
      { label: '睡衣', value: '睡衣' },
      { label: '鞋子', value: '鞋子' },
      { label: '袜子', value: '袜子' },
      { label: '配饰', value: '配饰' },
    ],
    positionList: [
      { label: '床左抽屉', value: '床左抽屉' },
      { label: '床右抽屉', value: '床右抽屉' },
      { label: '衣柜', value: '衣柜' },
      { label: '储藏室', value: '储藏室' },
      { label: '床头柜', value: '床头柜' },
    ],
    gridConfig: {
      column: 1,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
  },
    joinArray(array) {
      return array.join('-');
    },
    onClickPicker(e) {
      const { key } = e?.currentTarget?.dataset;
      console.log('key=',key)
      this.setData({
        [`${key}Visible`]: true,
      });
    },
    onPickerChange(e) {
      const { key } = e?.currentTarget?.dataset;
      this.setData({
        [`${key}Visible`]: false,
        [`form.${key}`]: e.detail.value,
      });
    },
    onPickerCancel(e) {
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },
    handleSuccess(e) {
      const that = this;
      const { files } = e.detail;
      console.log(files)
      const reqFile = files[0].url;
      wx.cloud.uploadFile({
        cloudPath: 'test/'+files[0].name, // 文件夹例子 test/文件名
        filePath: reqFile,
        config: {
          env: 'prod-9g32jz3109670496' // 微信云托管环境ID
        },
        success: res => {
          console.log(res)
          that.setData({
            [`form.imgurl`]: res.fileID,
            [`form.pic`]: files
          });
        },
        fail: err => {
          console.error(err)
        }
      })
      // wx.request({
      //   url: 'http://localhost:90/api/upload',
      //   data: files,
      //   method: 'post',
      //   header: {
      //     'content-type': 'application/json' 
      //   },
      //   success (res) {
      //     console.log(res.data)
      //   }
      // });
    },
    handleRemove(e) {
      const { index } = e.detail;
      const { form } = this.data;
      form.pic.splice(index, 1);
      this.setData({
        form
      });
    },
    handleInput(e) {
      this.setData({
        [`form.other`]: e.detail.value,
      });
    },
    formSubmit(e) {
      console.log('form发生了submit事件，携带数据为：', e)
      console.log('form:', this.data.form)
      wx.request({
        url: 'http://10.10.48.119:90/api/add_clothes',
        data: this.data.form,
        header: {
          'content-type': 'application/json' 
        },
        method: 'post',
        success (res) {
          console.log(res.data)
          const { code } = res.data;
          if(code == 0) {
            wx.navigateTo({
              url: '../index/index'
            })
          }
        }
      })
    },
    formReset(e) {
      console.log('form发生了reset事件，携带数据为：', e.detail.value)
      this.setData({
        form: emyptForm
      })
    }
})