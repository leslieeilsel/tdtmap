<template>
  <div>
    <div style="margin-bottom: 5px;" class="btns">
      <Button type="primary" icon="md-locate" @click="getLocalCity()"></Button>
      <Button type="error" icon="md-alert" @click="showEvents()"></Button>
      <Button type="primary" icon="md-car" @click="reviewTrack()"></Button>
      <Button type="primary" icon="md-planet" @click="show3DEarth()"></Button>
      <Button icon="md-refresh" @click="resetMap()"></Button>
    </div>
    <ButtonGroup type="button" class="guiji" v-if="showTrack">
      <Button type="primary" @click="_CarTrack.start()">开始</Button>
      <Button type="primary" @click="_CarTrack.pause()">暂停</Button>
      <Button type="primary" @click="_CarTrack.stop()">结束</Button>
    </ButtonGroup>
    <div :id="tdtMapDivID" :style="mapStyle"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'TdtMap',
  data() {
    return {
      tdtMapDivID: "tdtMapDivID_" + this._uid,
      map: {},
      localData: {},
      mapStyle: {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '95vh',
      },
      events: [
        {
          lng: '116.377830',
          lat: '39.902630',
          info: {
            type: '森林火灾',
            user: '用户1',
            datetime: '2021-01-01 12:00:00'
          },
        },
        {
          lng: '116.464000',
          lat: '39.945020',
          info: {
            type: '盗伐林木',
            user: '用户2',
            datetime: '2021-01-01 12:00:00'
          },
        },
        {
          lng: '116.324270',
          lat: '39.930540',
          info: {
            type: '破坏林地',
            user: '用户3',
            datetime: '2021-01-01 12:00:00'
          },
        },
        {
          lng: '116.390880',
          lat: '39.913420',
          info: {
            type: '病虫灾害',
            user: '用户4',
            datetime: '2021-01-01 12:00:00'
          },
        },
        {
          lng: '116.447180',
          lat: '39.898410',
          info: {
            type: '人畜破坏',
            user: '用户5',
            datetime: '2021-01-01 12:00:00'
          },
        },
      ],
      polygons: [
        [
          [116.364780, 39.946070],
          [116.426580, 39.946860],
          [116.429670, 39.902890],
          [116.353450, 39.897360],
          [116.349680, 39.940010]
        ],
        [
          [116.350020, 39.896570],
          [116.431390, 39.899460],
          [116.438260, 39.894460],
          [116.438600, 39.868380],
          [116.341440, 39.866530],
          [116.342470, 39.895510],
        ],
      ],
      columns1: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '巡护时间',
          key: 'dateRange'
        },
        {
          title: '操作',
          slot: 'action',
          width: 100,
          align: 'center'
        }
      ],
      data1: [
        {
          dateRange: '2021-01-01 12:00:00',
          points: [
            [116.26802, 39.90623],
            [116.28896, 39.90622],
            [116.30421, 39.90625],
            [116.3155, 39.90618],
            [116.3313, 39.90611],
            [116.34643, 39.90583],
            [116.35033, 39.90582],
            [116.36784, 39.90579],
            [116.36755, 39.91449],
            [116.36755, 39.91449],
            [116.36673, 39.93235],
            [116.36651, 39.93924],
            [116.36172, 39.93923],
            [116.34936, 39.93913],
            [116.33292, 39.93697],
            [116.319550, 39.931000]
          ]
        },
        {
          dateRange: '2021-01-01 12:30:00',
          points: [
            [116.26802, 39.90623],
            [116.28896, 39.90622],
            [116.30421, 39.90625],
            [116.3155, 39.90618],
            [116.3313, 39.90611],
            [116.34643, 39.90583],
            [116.35033, 39.90582],
            [116.36784, 39.90579],
            [116.36755, 39.91449],
            [116.36755, 39.91449],
            [116.36673, 39.93235],
            [116.36651, 39.93924],
            [116.36172, 39.93923],
            [116.34936, 39.93913],
            [116.33292, 39.93697],
            [116.319550, 39.931000]
          ]
        },
        {
          dateRange: '2021-01-01 13:00:00',
          points: [
            [116.26802, 39.90623],
            [116.28896, 39.90622],
            [116.30421, 39.90625],
            [116.3155, 39.90618],
            [116.3313, 39.90611],
            [116.34643, 39.90583],
            [116.35033, 39.90582],
            [116.36784, 39.90579],
            [116.36755, 39.91449],
            [116.36755, 39.91449],
            [116.36673, 39.93235],
            [116.36651, 39.93924],
            [116.36172, 39.93923],
            [116.34936, 39.93913],
            [116.33292, 39.93697],
            [116.319550, 39.931000]
          ]
        },
        {
          dateRange: '2021-01-01 13:30:00',
          points: [
            [116.26802, 39.90623],
            [116.28896, 39.90622],
            [116.30421, 39.90625],
            [116.3155, 39.90618],
            [116.3313, 39.90611],
            [116.34643, 39.90583],
            [116.35033, 39.90582],
            [116.36784, 39.90579],
            [116.36755, 39.91449],
            [116.36755, 39.91449],
            [116.36673, 39.93235],
            [116.36651, 39.93924],
            [116.36172, 39.93923],
            [116.34936, 39.93913],
            [116.33292, 39.93697],
            [116.319550, 39.931000]
          ]
        },
        {
          dateRange: '2021-01-01 14:00:00',
          points: [
            [116.26802, 39.90623],
            [116.28896, 39.90622],
            [116.30421, 39.90625],
            [116.3155, 39.90618],
            [116.3313, 39.90611],
            [116.34643, 39.90583],
            [116.35033, 39.90582],
            [116.36784, 39.90579],
            [116.36755, 39.91449],
            [116.36755, 39.91449],
            [116.36673, 39.93235],
            [116.36651, 39.93924],
            [116.36172, 39.93923],
            [116.34936, 39.93913],
            [116.33292, 39.93697],
            [116.319550, 39.931000]
          ]
        },
      ],
      showTrack: false,
      _CarTrack: {},
      tile: {},
    }
  },
  created() {
  },
  mounted() {
    this.mapStyle.height = (document.documentElement.clientHeight - 47) + 'px'
    // 初始化天地图
    this.initTdtMap()
  },
  watch: {},
  methods: {
    // 初始化天地图
    initTdtMap() {
      this.showTrack = false
      // 初始化地图
      this.map = new T.Map(this.tdtMapDivID)
      this.map.centerAndZoom(new T.LngLat(116.391260, 39.907050), 12)
      this.map.clearOverLays();
      if (!this.map.isDrag()) {
        this.map.enableDrag();
      }

      //创建对象
      const ctrl = new T.Control.MapType([{
        title: '地图', //地图控件上所要显示的图层名称
        icon: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png', //地图控件上所要显示的图层图标（默认图标大小80x80）
        layer: TMAP_NORMAL_MAP //地图类型对象，即MapType。
      }, {
        title: '卫星',
        icon: ' http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png',
        layer: TMAP_SATELLITE_MAP
      },
        {
          title: '卫星混合',
          icon: 'http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png',
          layer: TMAP_HYBRID_MAP
        },
        {
          title: '地形',
          icon: ' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrain.png',
          layer: TMAP_TERRAIN_MAP
        },
        {
          title: '地形混合',
          icon: ' http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrainpoi.png',
          layer: TMAP_TERRAIN_HYBRID_MAP
        }]);
      //添加控件
      this.map.addControl(ctrl);

      //创建缩放平移控件对象
      const control = new T.Control.Zoom();
      //添加缩放平移控件
      this.map.addControl(control);
      //创建比例尺控件对象
      const scale = new T.Control.Scale();
      //添加比例尺控件
      this.map.addControl(scale);
    },
    getLocalCity() {
      this.showTrack = false
      // IP 城市定位
      axios.get('http://location.tianditu.gov.cn/data/getCityName?callback=query').then(res => {
        console.log(res)
        const content = res.data.data.country + '，' + res.data.data.province + '，' + res.data.data.city + '，' + res.data.data.network
        this.map.centerAndZoom(new T.LngLat(res.data.data.lng, res.data.data.lat), res.data.data.level)
        this.$Modal.info({
          title: '当前所在城市',
          content: content
        });
      })
    },
    showEvents() {
      this.map.clearOverLays();
      if (this._CarTrack) {
        this._CarTrack.clear();
      }
      let that = this;
      this.showTrack = false
      this.map.centerAndZoom(new T.LngLat(116.391260, 39.907050), 12);
      this.events.forEach(function (e) {
        const point = new T.LngLat(e.lng, e.lat);
        const marker = new T.Marker(point);// 创建标注
        that.map.addOverLay(marker);

        const content = e.info;
        that.addClickHandler(content, marker);
      });
      this.addPolygon()
    },
    addPolygon() {
      let that = this
      this.polygons.forEach(function (ee) {
        let points = [];
        ee.forEach(function (e) {
          points.push(new T.LngLat(e[0], e[1]));
        });

        // 返回点 p0-p1-p2 围成的闭合区域面积，单位：平方米
        const area = AMap.GeometryUtil.ringArea(ee).toFixed(2);
        // console.log(that.getCenterPoint(ee))
        let labelPoint = that.getTheAreaCenter(ee)
        const label = new T.Label({
          text: area + ' m²',
          position: labelPoint,
        });
        //创建地图文本对象
        that.map.addOverLay(label);
        // console.log(area)
        //创建面对象
        const polygon = new T.Polygon(points, {
          color: "blue", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
        });
        //向地图上添加面
        that.map.addOverLay(polygon);
      });
    },
    addClickHandler(content, marker) {
      let that = this
      marker.addEventListener("click", function (e) {
            that.openInfo(content, e)
          }
      );
    },
    getCenterPoint(path) {
      //var path =e.;//Array<Point> 返回多边型的点数组
      //var ret=parseFloat(num1)+parseFloat(num2);
      let x = 0.0;
      let y = 0.0;
      for (let i = 0; i < path.length; i++) {
        x = x + parseFloat(path[i][0]);
        y = y + parseFloat(path[i][1]);
      }
      x = x / path.length;
      y = y / path.length;
      console.log(x)
      console.log(y)

      const point = new T.LngLat(x, y);
      const marker = new T.Marker(point);// 创建标注
      this.map.addOverLay(marker);
      //return new BMap.Point(path[0].lng,path[0].lat);
      // return new T.LngLat(x, y);
      //return path[0];
    },
    getTheAreaCenter(lnglatarr) {
      const total = lnglatarr.length;
      let X = 0, Y = 0, Z = 0;
      lnglatarr.forEach(function (e) {
        const lng = e[0] * Math.PI / 180;
        const lat = e[1] * Math.PI / 180;
        let x, y, z;
        x = Math.cos(lat) * Math.cos(lng);
        y = Math.cos(lat) * Math.sin(lng);
        z = Math.sin(lat);
        X += x;
        Y += y;
        Z += z;
      });

      X = X / total;
      Y = Y / total;
      Z = Z / total;

      const Lng = Math.atan2(Y, X);
      const Hyp = Math.sqrt(X * X + Y * Y);
      const Lat = Math.atan2(Z, Hyp);

      return new T.LngLat(Lng * 180 / Math.PI, Lat * 180 / Math.PI);
    },
    openInfo(content, e) {
      const showContent =
          '<p>事件类型：' + content.type + '</p>' +
          '<p>上报人：' + content.user + '</p>' +
          '<p>上报时间：' + content.datetime + '</p>';

      const point = e.lnglat;
      const markerInfoWin = new T.InfoWindow(showContent, {offset: new T.Point(0, -30)}); // 创建信息窗口对象
      this.map.openInfoWindow(markerInfoWin, point); //开启信息窗口
    },
    reviewTrack() {
      let points = [
        [116.26802, 39.90623],
        [116.28896, 39.90622],
        [116.30421, 39.90625],
        [116.3155, 39.90618],
        [116.3313, 39.90611],
        [116.34643, 39.90583],
        [116.35033, 39.90582],
        [116.36784, 39.90579],
        [116.36755, 39.91449],
        [116.36755, 39.91449],
        [116.36673, 39.93235],
        [116.36651, 39.93924],
        [116.36172, 39.93923],
        [116.34936, 39.93913],
        [116.33292, 39.93697],
        [116.319550, 39.931000]
      ];
      this.map.clearOverLays();
      this.tile = new T.TileLayer("http://t4.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=ada6b27844c65dcceb43cea14caf5b88");
      this.map.addLayer(this.tile)
      this.map.centerAndZoom(new T.LngLat(116.318090, 39.920270), 13);
      if (this._CarTrack) {
        this._CarTrack.clear();
      }
      this._CarTrack = new T.CarTrack(this.map, {
        interval: 5,
        speed: 10,
        dynamicLine: true,
        polylinestyle: {color: "#000", weight: 8, opacity: 0.9},
        Datas: points.map(function (obj) {
            return new T.LngLat(obj[0], obj[1]);
          }
        )
      });
      this.showTrack = true
    },
    show3DEarth() {
      let token = 'ada6b27844c65dcceb43cea14caf5b88';
      // 服务域名
      let tdtUrl = 'https://t{s}.tianditu.gov.cn/';
      // 服务负载子域
      let subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];

      // cesium 初始化
      let viewer = new Cesium.Map('tdtMapDivID', {
        shouldAnimate: true,
        selectionIndicator: true,
        infoBox: false
      });

      // 叠加影像服务
      let imgMap = new Cesium.UrlTemplateImageryProvider({
        url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
        subdomains: subdomains,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 18
      });
      viewer.imageryLayers.addImageryProvider(imgMap);

      // 叠加国界服务
      let iboMap = new Cesium.UrlTemplateImageryProvider({
        url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
        subdomains: subdomains,
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 10
      });
      viewer.imageryLayers.addImageryProvider(iboMap);

      // 叠加地形服务
      let terrainUrls = [];

      for (let i = 0; i < subdomains.length; i++) {
        let url = tdtUrl.replace('{s}', subdomains[i]) + 'DataServer?T=elv_c&tk=' + token;
        terrainUrls.push(url);
      }

      viewer.terrainProvider = new Cesium.GeoTerrainProvider({
        urls: terrainUrls
      });

      // 将三维球定位到中国
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
        orientation: {
          heading: Cesium.Math.toRadians(348.4202942851978),
          pitch: Cesium.Math.toRadians(-89.74026687972041),
          roll: Cesium.Math.toRadians(0)
        },
        complete: function callback() {
          // 定位完成之后的回调函数
        }
      });

      // 叠加三维地名服务
      let wtfs = new Cesium.GeoWTFS({
        viewer,
        subdomains: subdomains,
        metadata: {
          boundBox: {
            minX: -180,
            minY: -90,
            maxX: 180,
            maxY: 90
          },
          minLevel: 1,
          maxLevel: 20
        },
        aotuCollide: true, //是否开启避让
        collisionPadding: [5, 10, 8, 5], //开启避让时，标注碰撞增加内边距，上、右、下、左
        serverFirstStyle: true, //服务端样式优先
        labelGraphics: {
          font: "28px sans-serif",
          fontSize: 28,
          fillColor: Cesium.Color.WHITE,
          scale: 0.5,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 5,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          showBackground: false,
          backgroundColor: Cesium.Color.RED,
          backgroundPadding: new Cesium.Cartesian2(10, 10),
          horizontalOrigin: Cesium.HorizontalOrigin.MIDDLE,
          verticalOrigin: Cesium.VerticalOrigin.TOP,
          eyeOffset: Cesium.Cartesian3.ZERO,
          pixelOffset: new Cesium.Cartesian2(0, 8)
        },
        billboardGraphics: {
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.CENTER,
          eyeOffset: Cesium.Cartesian3.ZERO,
          pixelOffset: Cesium.Cartesian2.ZERO,
          alignedAxis: Cesium.Cartesian3.ZERO,
          color: Cesium.Color.WHITE,
          rotation: 0,
          scale: 1,
          width: 18,
          height: 18
        }
      });

      //三维地名服务，使用wtfs服务
      wtfs.getTileUrl = function () {
        return tdtUrl + 'mapservice/GetTiles?lxys={z},{x},{y}&tk=' + token;
      }

      wtfs.getIcoUrl = function () {
        return tdtUrl + 'mapservice/GetIcon?id={id}&tk=' + token;
      }

      wtfs.initTDT([{"x": 6, "y": 1, "level": 2, "boundBox": {"minX": 90, "minY": 0, "maxX": 135, "maxY": 45}}, {
        "x": 7,
        "y": 1,
        "level": 2,
        "boundBox": {"minX": 135, "minY": 0, "maxX": 180, "maxY": 45}
      }, {"x": 6, "y": 0, "level": 2, "boundBox": {"minX": 90, "minY": 45, "maxX": 135, "maxY": 90}}, {
        "x": 7,
        "y": 0,
        "level": 2,
        "boundBox": {"minX": 135, "minY": 45, "maxX": 180, "maxY": 90}
      }, {"x": 5, "y": 1, "level": 2, "boundBox": {"minX": 45, "minY": 0, "maxX": 90, "maxY": 45}}, {
        "x": 4,
        "y": 1,
        "level": 2,
        "boundBox": {"minX": 0, "minY": 0, "maxX": 45, "maxY": 45}
      }, {"x": 5, "y": 0, "level": 2, "boundBox": {"minX": 45, "minY": 45, "maxX": 90, "maxY": 90}}, {
        "x": 4,
        "y": 0,
        "level": 2,
        "boundBox": {"minX": 0, "minY": 45, "maxX": 45, "maxY": 90}
      }, {"x": 6, "y": 2, "level": 2, "boundBox": {"minX": 90, "minY": -45, "maxX": 135, "maxY": 0}}, {
        "x": 6,
        "y": 3,
        "level": 2,
        "boundBox": {"minX": 90, "minY": -90, "maxX": 135, "maxY": -45}
      }, {"x": 7, "y": 2, "level": 2, "boundBox": {"minX": 135, "minY": -45, "maxX": 180, "maxY": 0}}, {
        "x": 5,
        "y": 2,
        "level": 2,
        "boundBox": {"minX": 45, "minY": -45, "maxX": 90, "maxY": 0}
      }, {"x": 4, "y": 2, "level": 2, "boundBox": {"minX": 0, "minY": -45, "maxX": 45, "maxY": 0}}, {
        "x": 3,
        "y": 1,
        "level": 2,
        "boundBox": {"minX": -45, "minY": 0, "maxX": 0, "maxY": 45}
      }, {"x": 3, "y": 0, "level": 2, "boundBox": {"minX": -45, "minY": 45, "maxX": 0, "maxY": 90}}, {
        "x": 2,
        "y": 0,
        "level": 2,
        "boundBox": {"minX": -90, "minY": 45, "maxX": -45, "maxY": 90}
      }, {"x": 0, "y": 1, "level": 2, "boundBox": {"minX": -180, "minY": 0, "maxX": -135, "maxY": 45}}, {
        "x": 1,
        "y": 0,
        "level": 2,
        "boundBox": {"minX": -135, "minY": 45, "maxX": -90, "maxY": 90}
      }, {"x": 0, "y": 0, "level": 2, "boundBox": {"minX": -180, "minY": 45, "maxX": -135, "maxY": 90}}]);
    },
    resetMap() {
      if (this.map) {
        this.showTrack = false
        this.map.centerAndZoom(new T.LngLat(116.391260, 39.907050), 12)
        this.map.clearOverLays();
        // 清除所有轨迹绘制的元素，并注销相关地图事件。
        if (this._CarTrack) {
          this._CarTrack.clear();
        }
        // 移除轨迹图层
        if (this.tile) {
          this.map.removeLayer(this.tile)
        }
      }
    },
  }
}
</script>

<style scoped>
.btns .ivu-btn {
  margin: 5px;
}

.guiji {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: auto;
  z-index: 999;
  background: #fff;
  color: #5f5f5f;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  border-radius: 0 0 3px 3px !important;
  overflow: hidden;
}
</style>
