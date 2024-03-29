import 'package:flutter/material.dart';
import '../model/details.dart';
import '../pages/service_method.dart';
import 'dart:convert';

class DetailsInfoProvide with ChangeNotifier {
  DetailsModel goodsInfo = null;
  //点击左右选项卡标志
   bool isLeft = true;
   bool isRight = false; 
  //从后台获取商品信息

  getGoodsInfo(String id) async {
    var formData = {
      'goodId': id,
    };
    
    // return;
     //request('getGoodDetailById',formData:formData).then((val){
    //var responseData= json.decode(val.toString());
    //print(responseData);
   await Future.delayed(Duration(milliseconds: 200)).then((e) {
      
      goodsInfo = DetailsModel.fromJson(detailData);

      notifyListeners();
    });
  }
  //改变tabBar的状态
  changeLeftAndRight(String changeState){
    if(changeState=='left'){
      isLeft=true;
      isRight=false;
    }else{
      isLeft=false;
      isRight=true;
    }
     notifyListeners();

  }

}
