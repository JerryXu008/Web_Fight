import 'package:flutter/material.dart';
import './pages/index_page.dart';
import 'package:provide/provide.dart';

import './provide/counter.dart';//状态管理类
import './provide/child_category.dart';//状态管理类
import './provide/category_goods_list.dart';//状态管理类
import 'package:flutter_screenutil/flutter_screenutil.dart';
import './provide/details_info.dart';
import './provide/cart.dart';
import 'package:fluro/fluro.dart'; //路由组件
import './routers/routes.dart'; 
import './routers/application.dart';
import './provide/currentIndex.dart';


void main(){
  //将provide和counter引入程序顶层。,这是壮体啊管理必须要做的
  var counter =Counter();
  var childCategory = ChildCategory();
  var categoryGoodsListProvide= CategoryGoodsListProvide();
  var detailsInfoProvide= DetailsInfoProvide();
  var cartProvide = CartProvide();
   var currentIndexProvide  =CurrentIndexProvide();
  var providers  =Providers();
  providers
  ..provide(Provider<Counter>.value(counter))
  ..provide(Provider<ChildCategory>.value(childCategory))
  ..provide(Provider<CategoryGoodsListProvide>.value(categoryGoodsListProvide))
  ..provide(Provider<DetailsInfoProvide>.value(detailsInfoProvide))
  ..provide(Provider<CartProvide>.value(cartProvide))
  ..provide(Provider<CurrentIndexProvide>.value(currentIndexProvide))
  ;
  runApp(
    ProviderNode(child: MyApp(),providers: providers)
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //ScreenUtil.instance = ScreenUtil(width: 750, height: 1334)..init(context);
     
    //注册路由相关信息
    final router = Router();
    Routes.configureRoutes(router);
    Application.router=router;

    return Container(
      child: MaterialApp(
        title:'百姓生活+',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          primaryColor:Colors.pink
        ),
        home:IndexPage()
      ),
    );
  }
}