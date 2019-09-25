import 'package:flutter/material.dart';
import '../model/category.dart';

//ChangeNotifier的混入是不用管理听众
class ChildCategory with ChangeNotifier{

    List<BxMallSubDto> childCategoryList = [];
     int childIndex = 0;
     String categoryId = '4';
     int categoryIndex=0; //大类索引
     String subId =''; //小类ID 
     int page = 1; //列表页数，当改变大类或者小类时进行改变
      String noMoreText = ''; //显示更多的表示
     
     getChildCategory(List<BxMallSubDto> list,String id){
      childIndex=0;//每次点击大类，右侧上面导航栏 归0
      categoryId = id;
      
      //------------------关键代码start
      page=1;
      noMoreText = ''; 
      //------------------关键代码end
      subId=''; //点击大类时，把子类ID清空

      BxMallSubDto all=  BxMallSubDto();
      all.mallSubId='';
      all.mallCategoryId='00';
      all.mallSubName = '全部';
      all.comments = 'null';
      childCategoryList=[all];
      childCategoryList.addAll(list);   
      notifyListeners();
     
      
    }

    //改变子类索引
    changeChildIndex(index,String id){
        //传递两个参数，使用新传递的参数给状态赋值
       childIndex=index;
       subId=id;
      
       //------------------关键代码start
       page=1;
       noMoreText = ''; //显示更多的表示
       //------------------关键代码end
       notifyListeners();
    }
    //首页点击类别是更改类别
    changeCategory(String id,int index){
        categoryId=id;
        categoryIndex=index;
        subId ='';//小类别恢复默认值
       // subId ='';
        notifyListeners();
    }

     //增加Page的方法f
    addPage(){
      page++;
    }
      //改变noMoreText数据  
    changeNoMore(String text){
      noMoreText=text;
      notifyListeners();
    }
}