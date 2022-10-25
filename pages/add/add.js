Page({
  data: { 
    seasonsVisible: false,
    pickerTitle: '季节选择',
    seasonsList: [
      { label: '春秋', value: '春秋' },
      { label: '夏', value: '夏' },
      { label: '冬', value: '冬' },
    ],
    seasonsValue: [],
  },
    joinArray(array) {
      return array.join('-');
    },
    onClickPicker(e) {
      console.log(88)
      this.setData({
        seasonsVisible: true,
      });
    },
    onColumnChange(e) {
      console.log('picker pick:', e);
    },
    onPickerChange(e) {
      console.log('picker change:', e.detail);
      this.setData({
        seasonsVisible: false,
        seasonsValue: e.detail.value,
        seasonsCurrentValue: this.joinArray(e.detail.value),
      });
    },
    onPickerCancel(e) {
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        seasonsVisible: false,
      });
    },
    formSubmit(e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      // wx.request({
      //   url: 'http://127.0.0.1:7001/login/',
      //   data: e.detail.value,
      //   header: {
      //     'content-type': 'application/json' 
      //   },
      //   method: 'post',
      //   success (res) {
      //     console.log(res.data)
      //   }
      // })
    },
  
    formReset(e) {
      console.log('form发生了reset事件，携带数据为：', e.detail.value)
      this.setData({
      })
    }
})