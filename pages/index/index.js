import Message from 'tdesign-miniprogram/message/index';
Page({
  data: {
    clothesList: [
      // {
      //   season: '夏',
      //   type: '半身裙',
      //   position: '衣柜',
      //   other: 'test',
      //   imgname: 'geuf9qr5m2.jpg',
      //   imgurl: 'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/image/image-2.jpg'
      // },
      // {
      //   season: '春秋',
      //   type: '上衣',
      //   position: '床左抽屉',
      //   other: 'testc',
      //   imgname: 'geuci1u0y2.jpg',
      //   imgurl: 'http://tmp/eYUiQtzU7rU6a73c94f9b8c34fb5f0ccbeab6acff6aa.jpg'
      // }
    ]
  },
  onLoad() {
    console.log('load data');
    this.getClothesList();
  },
  getClothesList () {
    const that = this;
    wx.request({
      url: 'http://10.10.48.119:90/api/get_clothes',
      header: {
        'content-type': 'application/json' 
      },
      method: 'get',
      success (res) {
        // console.log(res.data)
        const { code, data } = res.data;
        if(code == 0) {
          that.setData({
            clothesList: data
          })
        }
      }
    })
  },
  toAdd (e) {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  handleDel(e) {
    const that = this;
    const id = e.target.dataset.id;
    console.log('del=',id)
    wx.request({
      url: 'http://10.10.48.119:90/api/del_clothes/'+id,
      method: 'delete',
      success (res) {
        console.log(res.data)
        const { code } = res.data;
        if(code == 0) {
          that.getClothesList();
          Message.info({
            context: that,
            offset: [20, 32],
            duration: 5000,
            icon: false,
            content: '衣服已经丢弃～～',
          });
        }else {
          console.log('del error')
        }
      }
    })
  }
})
