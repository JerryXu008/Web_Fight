import 'package:flutter/material.dart';
import '../model/categoryGoodsList.dart';
/*
制作Provide是有一个小技巧的，就是页面什么元素需要改变，
你就制作什么的provide类，比如现在我们要点击大类，改变商品列表，
实质改变的就是List的值，那只制作商品列表List的Provide就可以了。
 */
class CategoryGoodsListProvide with ChangeNotifier{
List<CategoryListData> goodsList = [];
//点击大类时更换商品列表
    getGoodsList(List<CategoryListData> list){
           
      goodsList=list;   
      notifyListeners();
    }
    //上拉加载列表
    addGoodsList(List<CategoryListData> list){
      goodsList.addAll(list);
       notifyListeners();
    }
}