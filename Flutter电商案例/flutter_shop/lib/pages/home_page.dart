import 'package:flutter/material.dart';
import 'package:flutter/material.dart' as prefix0;
//import 'package:dio/dio.dart';
import 'service_method.dart';

import 'package:flutter_swiper/flutter_swiper.dart';
import 'dart:convert';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_easyrefresh/easy_refresh.dart';
import './../routers/application.dart';

class HomePage extends StatefulWidget {
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with AutomaticKeepAliveClientMixin {
  String homePageContent = '正在获取数据';
  //火爆专区的变量
  int page = 1;
  List<Map> hotGoodsList = [];

  //保持页面状态
  @override
  bool get wantKeepAlive => true;
  GlobalKey<RefreshFooterState> _footerKey =
      new GlobalKey<RefreshFooterState>();

  @override
  void initState() {
    super.initState();
    //print('是否重新加载');
    //火爆专区接口
    _getHotGoods();
  }

  @override
  Widget build(BuildContext context) {
    //print('>>>>>>>>>>>>>>首页重新加载');
    return Container(
      child: Scaffold(
        appBar: AppBar(title: Text('百姓生活+')),
        body: FutureBuilder(
          future: getHomePageContent(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              //不是标准json，解析报错，真垃圾
//var dd = '{"banners": "["{"pic": "http://p1.music.126.net/_fNNfBkXOKXim4JekycKFw==/109951164368379162.jpg"}"]"';
//模拟数据
              var data = {
                "data": {
                  //bannaer数据
                  "banners": [
                    {
                      "pic":
                          "http://p1.music.126.net/_fNNfBkXOKXim4JekycKFw==/109951164368379162.jpg"
                    },
                    {
                      "pic":
                          "http://p1.music.126.net/_fNNfBkXOKXim4JekycKFw==/109951164368379162.jpg"
                    },
                    {
                      "pic":
                          "http://p1.music.126.net/_fNNfBkXOKXim4JekycKFw==/109951164368379162.jpg"
                    },
                  ],
                  //导航数据
                  "category": [
                    {
                      'image':
                          'https://p2.music.126.net/Mz8e5iGso7dbyxzbZmHOWw==/109951164371362424.jpg',
                      'mallCategoryName': '啤酒'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
                      'mallCategoryName': '花生'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
                      'mallCategoryName': '牛奶'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg',
                      'mallCategoryName': '饮料'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/S9uAn8UjV1JJQ9NAd861oQ==/109951164371271116.jpg',
                      'mallCategoryName': '卫生纸'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/AtYmTUtlxotbQmA4BO25TA==/109951163393887470.jpg',
                      'mallCategoryName': '辣条'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/AtYmTUtlxotbQmA4BO25TA==/109951163393887470.jpg',
                      'mallCategoryName': '瓜子'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/AtYmTUtlxotbQmA4BO25TA==/109951163393887470.jpg',
                      'mallCategoryName': '馒头'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/AtYmTUtlxotbQmA4BO25TA==/109951163393887470.jpg',
                      'mallCategoryName': '蔬菜'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/AtYmTUtlxotbQmA4BO25TA==/109951163393887470.jpg',
                      'mallCategoryName': '豆腐'
                    },
                  ],

                  'advertesPicture': {
                    'PICTURE_ADDRESS':
                        'https://p2.music.126.net/C8g4Z6GIKPg2xk-duIXEYw==/109951164367825696.jpg'
                  },
                  //电话数据
                  'shopInfo': {
                    'leaderImage':
                        'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
                    'leaderPhone': '18201508709'
                  },
                  //商品推荐
                  'recommend': [
                    {
                      'image':
                          'https://p2.music.126.net/MzHgBGC4yEwCeOHUg5oGGg==/109951164317236341.jpg',
                      'mallPrice': '198',
                      'price': '299'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/NJ2uR8HIWdk4PoTn0b540Q==/109951164370327558.jpg',
                      'mallPrice': '1198',
                      'price': '299'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg',
                      'mallPrice': '1298',
                      'price': '2299'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/t5lalcY7dQq2dhcXB3EtVA==/109951163434572045.jpg',
                      'mallPrice': '1938',
                      'price': '3299'
                    }
                  ],
                  //楼层
                  'floor1Pic':
                      'https://p2.music.126.net/AtYmTUtlxotbQmA4BO25TA==/109951163393887470.jpg',
                  'floor2Pic':
                      'https://p2.music.126.net/6Dnpnv9pi30ix2LuoNU1IQ==/109951163755515426.jpg',
                  'floor3Pic':
                      'https://p2.music.126.net/EKGVSR3ej-2hCPrJlkMlcQ==/109951164191791435.jpg',
                  'floor1': [
                    {
                      'image':
                          'https://p2.music.126.net/Vul1lVY04aTjJU984riRXw==/19056735533185390.jpg'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/MzHgBGC4yEwCeOHUg5oGGg==/109951164317236341.jpg'
                    },
                    {
                      'image':
                          'http://p1.music.126.net/oQDFR5YRR6QsP_jxKhmFJw==/109951164371253151.jpg'
                    },
                    {
                      'image':
                          'http://p1.music.126.net/MqjEnJ24Gc7W9uHxb-wwDg==/109951164370543101.jpg'
                    },
                  ],
                  'floor2': [
                    {
                      'image':
                          'https://p2.music.126.net/Vul1lVY04aTjJU984riRXw==/19056735533185390.jpg'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/MzHgBGC4yEwCeOHUg5oGGg==/109951164317236341.jpg'
                    },
                    {
                      'image':
                          'http://p1.music.126.net/oQDFR5YRR6QsP_jxKhmFJw==/109951164371253151.jpg'
                    },
                    {
                      'image':
                          'http://p1.music.126.net/MqjEnJ24Gc7W9uHxb-wwDg==/109951164370543101.jpg'
                    },
                  ],
                  'floor3': [
                    {
                      'image':
                          'https://p2.music.126.net/Vul1lVY04aTjJU984riRXw==/19056735533185390.jpg'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg'
                    },
                    {
                      'image':
                          'https://p2.music.126.net/MzHgBGC4yEwCeOHUg5oGGg==/109951164317236341.jpg'
                    },
                    {
                      'image':
                          'http://p1.music.126.net/oQDFR5YRR6QsP_jxKhmFJw==/109951164371253151.jpg'
                    },
                    {
                      'image':
                          'http://p1.music.126.net/MqjEnJ24Gc7W9uHxb-wwDg==/109951164370543101.jpg'
                    },
                  ],
                }
              };

              List<Map> swiperDataList =
                  (data['data']['banners'] as List).cast();
              List<Map> navigatorList =
                  (data['data']['category'] as List).cast();
              String advertesPicture =
                  (data['data']['advertesPicture'] as Map)['PICTURE_ADDRESS'];
              String leaderImage =
                  (data['data']['shopInfo'] as Map)['leaderImage']; //店长图片
              String leaderPhone =
                  (data['data']['shopInfo'] as Map)['leaderPhone']; //店长电话
              List<Map> recommendList =
                  (data['data']['recommend'] as List).cast(); // 商品推荐
              String floor1Title = data['data']['floor1Pic']; //楼层1的标题图片
              //  String floor2Title =data['data']['floor2Pic'] ;//楼层1的标题图片
              //  String floor3Title =data['data']['floor3Pic'] ;//楼层1的标题图片
              List<Map> floor1 =
                  (data['data']['floor1'] as List).cast(); //楼层1商品和图片
              // List<Map> floor2 = (data['data']['floor2'] as List).cast(); //楼层1商品和图片
              // List<Map> floor3 = (data['data']['floor3'] as List).cast(); //楼层1商品和图片

              return EasyRefresh(
                child: ListView(
                  children: <Widget>[
                    SwiperDiy(swiperDataList: swiperDataList), //轮播图
                    TopNavigator(navigatorList: navigatorList), //导航栏
                    AdBanner(advertesPicture: advertesPicture), //广告
                    LeaderPhone(
                      leaderImage: leaderImage,
                      leaderPhone: leaderPhone,
                    ),
                    Recommend(
                      recommendList: recommendList,
                    ),
                    FloorTitle(picture_address: floor1Title),
                    FloorContent(floorGoodsList: floor1),
                    _hotGoods()
                    // FloorTitle(picture_address:floor2Title),
                    // FloorContent(floorGoodsList:floor2),
                    // FloorTitle(picture_address:floor3Title),
                    // FloorContent(floorGoodsList:floor3),
                  ],
                ),
                loadMore: () async {
                  print('开始加载更多...');
                  //模拟下载
                  _getHotGoods();
                },
                refreshFooter: ClassicsFooter(
                    key: _footerKey,
                    bgColor: Colors.white,
                    textColor: Colors.pink,
                    moreInfoColor: Colors.pink,
                    showMore: true,
                    noMoreText: '',
                    moreInfo: '加载中',
                    loadReadyText: '上拉加载....'),
              );
            } else {
              return Center(
                child: Text('加载中'),
              );
            }
          },
        ),
      ),
    );
  }

  //火爆商品接口
  void _getHotGoods() {
   // print('开始获取火爆商品');
    var formPage = {'page': page};
    //request('homePageBelowConten',formData:formPage).then((val){
    var newGoodsList = [
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
      {
        'image':
            'http://p1.music.126.net/hsWz9h5uPmeqvXKAaxsj7Q==/109951164370505703.jpg',
        'name': '中国香港美心月饼',
        'mallPrice': '100',
        'price': '500'
      },
    ];
    //var data=json.decode(val.toString());
    // List<Map> newGoodsList = (data['data'] as List ).cast();
    //这样才可以改变UI，我的理解，和VUE似的，数据驱动UI
    setState(() {
      hotGoodsList.addAll(newGoodsList);
      page++;
    });

    //});
  }

  //火爆专区
//火爆专区标题
  Widget _hotTitle = Container(
    margin: EdgeInsets.only(top: 10.0),
    padding: EdgeInsets.all(5.0),
    alignment: Alignment.center,
    decoration: BoxDecoration(
        color: Colors.white,
        border: Border(bottom: BorderSide(width: 0.5, color: Colors.black12))),
    child: Text('火爆专区'),
  );
  //火爆专区子项
  //不采用网格布局，因为性能消耗大，该用流狮布局
  Widget _wrapList() {
    if (hotGoodsList.length != 0) {
      List<Widget> listWidget = hotGoodsList.map((val) {
        return InkWell(
          onTap: () {
            print('点击了火爆商品');
          },
          child: Container(
            width: ScreenUtil().setWidth(372),
            color: Colors.white,
            padding: EdgeInsets.all(5.0),
            margin: EdgeInsets.only(bottom: 3.0),
            child: Column(
              children: <Widget>[
                Image.network(
                  val['image'],
                  width: ScreenUtil().setWidth(375),
                  height: ScreenUtil().setHeight(275),
                  fit: BoxFit.fill,
                ),
                Text(val['name'],
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        color: Colors.pink, fontSize: ScreenUtil().setSp(26))),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: <Widget>[
                    Text('￥${val['mallPrice']}'),
                    Text(
                      '￥${val['price']}',
                      style: TextStyle(
                          color: Colors.black26,
                          decoration: TextDecoration.lineThrough),
                    )
                  ],
                )
              ],
            ),
          ),
        );
      }).toList();
      //流失布局
      return Wrap(spacing: 2, children: listWidget);
    } else {
      return Text('  ');
    }
  }

  //火爆专区组合
  Widget _hotGoods() {
    return Container(
        child: Column(
      children: <Widget>[
        _hotTitle,
        _wrapList(),
      ],
    ));
  }
}

// 首页轮播组件编写
class SwiperDiy extends StatelessWidget {
  final List swiperDataList;
  const SwiperDiy({Key key, this.swiperDataList}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // print('设备宽度:${ScreenUtil.screenWidth}');
    // print('设备高度:${ScreenUtil.screenHeight}');
    // print('设备像素密度:${ScreenUtil.pixelRatio}');
    return Container(
      child: Container(
        height: ScreenUtil().setHeight(333),
        width: ScreenUtil().setWidth(750),
        child: Swiper(
          itemBuilder: (BuildContext context, int index) {
            return InkWell(
              onTap: () {
                   Application.router.navigateTo(context,"/detail?id=2c9f6c94621970a801626a363e5a0176");
              },
              child: Image.network("${swiperDataList[index]['pic']}",
                  fit: BoxFit.fill),
            );
          },
          itemCount: swiperDataList.length,
          pagination: new SwiperPagination(),
          autoplay: true,
        ),
      ),
    );
  }
}

//导航栏的编写
class TopNavigator extends StatelessWidget {
  final List navigatorList;
  const TopNavigator({Key key, this.navigatorList}) : super(key: key);
  //单个组件
  Widget _gridViewItemUI(BuildContext context, item) {
    return InkWell(
        onTap: () {
          print('点击了导航');
        },
        child: Column(
          children: <Widget>[
            new ClipOval(
              child: Image.network(item['image'],
                  width: ScreenUtil().setWidth(95)),
            ),
            Text(item['mallCategoryName'])
          ],
        ));
  }

  @override
  Widget build(BuildContext context) {
    if (navigatorList.length > 10) {
      navigatorList.removeRange(10, navigatorList.length);
    }
    return Container(
      child: Container(
        height: ScreenUtil().setWidth(320),
        padding: EdgeInsets.all(3.0),
        child: GridView.count(
          physics: new NeverScrollableScrollPhysics(),
          crossAxisCount: 5,
          padding: EdgeInsets.all(4.0),
          children: navigatorList.map((item) {
            return _gridViewItemUI(context, item);
          }).toList(),
        ),
      ),
    );
  }
}

//广告图片
class AdBanner extends StatelessWidget {
  final String advertesPicture;
  const AdBanner({Key key, this.advertesPicture}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Image.network(advertesPicture,
          width: ScreenUtil().setWidth(750),
          height: ScreenUtil().setHeight(100),
          fit: BoxFit.fill),
    );
  }
}

//打电话模块
class LeaderPhone extends StatelessWidget {
  final String leaderImage; //店长图片
  final String leaderPhone; //店长电话
  const LeaderPhone({Key key, this.leaderImage, this.leaderPhone})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: InkWell(
        onTap: () {
          _launchURL();
        },
        child: Image.network(leaderImage,
            width: ScreenUtil().setWidth(750),
            height: ScreenUtil().setHeight(120),
            fit: BoxFit.fill),
      ),
    );
  }

  void _launchURL() async {
    String url = 'tel:' + leaderPhone;
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw '不能加载url $url';
    }
  }
}

//商品推荐
class Recommend extends StatelessWidget {
  final List recommendList;
  const Recommend({Key key, this.recommendList}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      // height: ScreenUtil().setHeight(380), //不设置高度，让子元素自己撑起来
      margin: EdgeInsets.only(top: 10.0),
      child: Column(
        children: <Widget>[_titleWidget(), _recommedList()],
      ),
    );
  }

//推荐商品标题
  Widget _titleWidget() {
    return Container(
      alignment: Alignment.centerLeft,
      padding: EdgeInsets.fromLTRB(10.0, 2.0, 0, 5.0),
      decoration: BoxDecoration(
          color: Colors.white,
          border:
              Border(bottom: BorderSide(width: 1.0, color: Colors.black12))),
      child: Text(
        '商品推荐',
        style: TextStyle(color: Colors.pink),
      ),
    );
  }

//商品推荐内容
  Widget _recommedList() {
    return Container(
      height: ScreenUtil().setHeight(260),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: recommendList.length,
        itemBuilder: (context, index) {
          return _item(index);
        },
      ),
    );
  }

  Widget _item(index) {
    return InkWell(
      onTap: () {},
      child: Container(
        //height: ScreenUtil().setHeight(330),
        width: ScreenUtil().setWidth(250),
        padding: EdgeInsets.all(8.0),

        decoration: BoxDecoration(
            color: Colors.white,
            border:
                Border(left: BorderSide(width: 1.0, color: Colors.black12))),
        child: Column(
          children: <Widget>[
            Image.network(recommendList[index]['image'], fit: BoxFit.fill),
            Container(
              //padding: EdgeInsets.only(top: 10.0),
              child: Text(
                '¥${recommendList[index]['mallPrice']}',
              ),
            ),
            Text(
              '¥${recommendList[index]['price']}',
              style: TextStyle(
                  decoration: TextDecoration.lineThrough, color: Colors.grey),
            )
          ],
        ),
      ),
    );
  }
}

//楼层模块
//楼层标题组件
class FloorTitle extends StatelessWidget {
  final String picture_address; // 图片地址
  FloorTitle({Key key, this.picture_address}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        padding: EdgeInsets.all(8.0),
        child: Image.network(picture_address,
            width: ScreenUtil().setWidth(750),
            height: ScreenUtil().setHeight(200),
            fit: BoxFit.fill));
  }
}

//楼层商品组件
class FloorContent extends StatelessWidget {
  final List floorGoodsList;
  FloorContent({Key key, this.floorGoodsList}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[_firstRow(), _otherGoods()],
      ),
    );
  }

  Widget _firstRow() {
    return Row(
      children: <Widget>[
        _goodsItem(floorGoodsList[0], 300.0),
        Column(
          children: <Widget>[
            _goodsItem(floorGoodsList[1], 150.0),
            _goodsItem(floorGoodsList[2], 150.0),
          ],
        )
      ],
    );
  }

  Widget _otherGoods() {
    return Row(
      children: <Widget>[
        _goodsItem(floorGoodsList[3], 150.0),
        _goodsItem(floorGoodsList[4], 150.0),
      ],
    );
  }

  Widget _goodsItem(Map goods, height) {
    return Container(
      width: ScreenUtil().setWidth(375),
      height: ScreenUtil().setWidth(height),
      child: Image.network(goods['image'], fit: BoxFit.fill),
    );
  }
}
