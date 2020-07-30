<template>
  <div class="address-select">
    <div
      class="address-select-btn address-cancel"
      @click="()=>{this.$emit('close')}">取消</div>
    <div
      :class="{'disable': !address }"
      class="address-select-btn address-confirm"
      @click="confirm"
    >确定</div>
    <div class="map-box">
      <van-icon name="location" />
      <div
        id="container"
        style="width: 100%;height:100%" />
    </div>
    <div class="address-main">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        @input="searchConfirm" />
      <ul class="address-list">
        <li
          v-for="(item, index) in arounds"
          :key="index"
          class="address-item"
          @click="selectAddress(item)"
        >
          <van-icon
            v-show="item.address === address"
            class="tick-icon"
            name="success"
            size="20px"
            color="#218aef"
          />
          <strong>{{ item.name }}</strong>
          <p>{{ item.address }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Dialog, Toast } from 'vant'
import { debounce } from 'lodash'
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
export default {
  props: {
    center: {
      type: Array,
      default: () => [119.3, 26.08333]
    },
    mapXID: { // 经度
      type: String,
      default: 'LGTD'
    },
    mapYID: { // 纬度
      type: String,
      default: 'LTTD'
    },
    decimalCount: { // 取几位小数
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      isMove: true, // 判断是否手动移动地图or点击地址项导致地图移动
      // 高德地图配置
      amapKey: 'ce690184d1a7632aa2eaf4d051ca65bf',
      amapApi: 'https://restapi.amap.com/',
      cityCode: null, // 所在城市编码
      map: null, // 地图对象
      latlng: null, // 地图中心经纬度
      arounds: [], // 周边搜索
      searchValue: null, // 搜索值
      address: null
    }
  },
  computed: {
    config() {
      const config = {
        center: this.center || [119.3, 26.08333],
        zoom: 12,
        maxZoom: 18,
        provider: 'GaodeMap.Normal'
      }
      return config
    }
  },
  mounted() {
    this.map = new AMap.Map('container', {
      resizeEnable: true,
      zoom: 11,
      center: this.center
    })
    console.log(2222222222)
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: '定位中'
    })
    AMap.plugin('AMap.Geolocation', () => {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：5s
        buttonPosition: 'RB', // 定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
      })
      this.map.addControl(geolocation)
      geolocation.getCurrentPosition()
      AMap.event.addListener(geolocation, 'complete', (result) => {
        Toast.clear()
        this.isMove = false
        const { lng, lat } = result.position
        this.latlng = { lng, lat }
        this.getCurCity()
        this.getCityAround()
      })
      AMap.event.addListener(geolocation, 'error', (result) => {
        Toast.clear()
        console.log(result.message)
        Dialog({ message: '定位当前位置失败:' + result.message })
      })
      // geolocation.getCurrentPosition((status, result) => {
      //   if (status === 'complete') {
      //     let { lng, lat } = result.position
      //     this.latlng = { lng, lat }
      //     this.getCurCity()
      //     this.getCityAround()
      //   } else {
      //     this.$message.error('定位当前位置失败:' + result.message)
      //   }
      // })
    })
    this.map.on('moveend', (e) => {
      if (this.isMove) {
        this.latlng = this.map.getCenter()
        this.getCityAround()
      }
      this.isMove = true
    })
  },
  destroyed() {
    this.map.off('moveend')
  },
  methods: {
    // 获取当前位置经纬度
    getCurLatlng(flag) {
      this.isMove = false
      return new Promise(resolve => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude // 纬度
            const lng = position.coords.longitude // 经度
            this.latlng = { lng, lat }
            if (flag) {
              this.getCurCity()
              this.getCityAround()
            }
            resolve()
          }, (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert('定位失败,用户拒绝请求地理定位')
                break
              case error.POSITION_UNAVAILABLE:
                alert('定位失败,位置信息是不可用')
                break
              case error.TIMEOUT:
                alert('定位失败,请求获取用户位置超时')
                break
              case error.UNKNOWN_ERROR:
                alert('定位失败,定位系统失效')
                break
            }
            resolve()
          })
        } else {
          alert('浏览器不支持地理定位。')
        }
        resolve()
        // this.$jsonp('https://webapi.amap.com/maps/ipLocation', { key: this.amapKey, platform: "JS", output: "jsonp" }).then(json => {
        //   // Success.
        //   if (json && json.status === 1) {
        //     let { lng, lat } = json
        //     this.latlng = { lng, lat }
        //     if (flag) {
        //       this.getCurCity()
        //       this.getCityAround()
        //     }
        //   }
        //   resolve()
        // }).catch(err => {
        //   // Failed.
        //   alert(err)
        //   resolve()
        // })
      })
    },
    // 获取当前城市
    getCurCity() {
      const { lng, lat } = this.latlng
      this.$jsonp(`${this.amapApi}v3/geocode/regeo`, { key: this.amapKey, location: lng + ',' + lat }).then(json => {
        // Success.
        if (json && json.status === '1') {
          this.cityCode = json.regeocode.addressComponent.citycode
        }
      }).catch(err => {
        // Failed.
        alert(err)
      })
    },
    // 获取当前位置周边
    getCityAround() {
      this.$jsonp(`${this.amapApi}v3/place/around`, { location: this.latlng.lng + ',' + this.latlng.lat, key: this.amapKey, radius: 5000, offset: 10, page: 1, extensions: 'all', types: '汽车服务|汽车销售|汽车维修|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|道路附属设施|地名地址信息|公共设施' }).then(json => {
        // Success.
        if (json && json.status === '1') {
          json.pois.forEach(n => {
            let address = ''
            n.pname && (address += n.pname)
            n.cityname && (address += n.cityname)
            n.adname && (address += n.adname)
            n.name && (address += n.name)
            n.address = address
          })
          this.arounds = json.pois
          if (this.arounds.length > 0) {
            this.selectAddress(this.arounds[0])
          }
        }
      }).catch(err => {
        // Failed.
        alert(err)
      })
    },
    // 搜索确认
    searchConfirm() {
      if (this.searchValue) {
        this.getSearchList(this, this.searchValue)
      } else {
        this.getCityAround()
      }
    },
    // 输入提示内容
    getSearchList: debounce((that, val) => {
      that.$jsonp(`${that.amapApi}v3/place/text`, { keywords: val, city: that.cityCode, key: that.amapKey, radius: 5000, offset: 10, page: 1, extensions: 'all', types: '汽车服务|汽车销售|汽车维修|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|道路附属设施|地名地址信息|公共设施' }).then(json => {
        // Success.
        if (json && json.status === '1') {
          json.pois.forEach(n => {
            let address = ''
            n.pname && (address += n.pname)
            n.cityname && (address += n.cityname)
            n.adname && (address += n.adname)
            n.name && (address += n.name)
            n.address = address
          })
          that.arounds = json.pois
        }
      }).catch(err => {
        // Failed.
        alert(err)
      })
    }, 300),
    // 选择地址
    selectAddress(item) {
      this.isMove = false
      const arr = item.location && item.location.split(',')
      this.latlng = {
        lng: arr[0],
        lat: arr[1]
      }
      this.map.setCenter(arr)
      this.address = item.address
    },
    confirm() {
      // if (this.latlng) {
      //   this.latlng.lng = this.latlng.lng && (this.latlng.lng - 0).toFixed(this.decimalCount)
      //   this.latlng.lat = this.latlng.lat && (this.latlng.lat - 0).toFixed(this.decimalCount)
      //   this.$emit('changeLatlng', this.latlng, this.latlng.lat, this.mapYID)
      //   this.$emit('changeLatlng', this.latlng, this.latlng.lng, this.mapXID)
      // }
      // this.data._result = this.address
      // this.data._resultText = this.address
      // this.source.isShowPopup = false
    }
  }
};
</script>
<style lang="scss">
.address-select {
  position: relative;
  height: 100vh;
  .address-select-btn {
    box-sizing: border-box;
    padding-left: 3px;
    z-index: 9999;
    font-size: 13px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #ffffff;
    border-radius: 6px;
    letter-spacing: 3px;
    &.address-cancel {
      position: absolute;
      left: 15px;
      top: 10px;
      background-color: #0e7df3;
    }
    &.address-confirm {
      background-color: #07c160;
      position: absolute;
      right: 15px;
      top: 10px;
      &.disable {
        opacity: 0.5;
      }
    }
  }
  .map-box {
    height: 60%;
    position: relative;
    .van-icon-location {
      pointer-events: none;
      color: red;
      font-size: 32px;
      z-index: 500;
      position: absolute;
      left: 50%;
      top: calc(50% - 18px);
      margin-top: -20px;
      margin-left: -16px;
    }
    .location-btn {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      width: 30px;
      height: 30px;
      font-size: 20px;
      background-color: #ffffff;
      z-index: 500;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
  .address-main {
    height: 40%;
    display: flex;
    flex-flow: column;
    .address-list {
      flex: 1;
      overflow: auto;
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        position: relative;
        cursor: pointer;
        padding: 8px 36px 8px 10px;
        border-top: 1px solid #e1e1e1;
        background-color: #fff;
        .tick-icon {
          position: absolute;
          right: 15px;
          top: calc(50% - 10px);
        }
        strong {
          font-size: 14px;
          font-weight: 400;
          line-height: 21px;
        }
        p {
          line-height: 18px;
          font-size: 12px;
          color: #999;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
