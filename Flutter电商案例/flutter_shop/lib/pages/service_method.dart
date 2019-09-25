import 'package:dio/dio.dart';
import 'dart:async';
import 'dart:io';
import '../config/service_url.dart';

Future getHomePageContent() async{
  print('==================>重新获取首页网络数据');
  try{
   // print('开始获取首页数据...............');
    Response response;
    Dio dio = new Dio();
    dio.options.contentType=ContentType.parse("application/x-www-form-urlencoded");
   // var formData = {'lon':'115.02932','lat':'35.76189'};
    var formData = {'type':2};
   // response = await dio.post(servicePath['homePageContext'],data:formData);
    response = await dio.get('http://music.it666.com:3666/banner'
    ,queryParameters: formData);
   
  // print('=============>返回数据了');
    if(response.statusCode==200){
      return response.data;
    }else{
      //throw Exception('后端接口出现异常，请检测代码和服务器情况.........');
      return print('数据请求失败');
    }
  }catch(e){
    return print('ERROR:======>${e}');
  }

}

Future request(url,{formData})async{
    try{
      print('开始获取数据...............');
      Response response;
      Dio dio = new Dio();
      dio.options.contentType=ContentType.parse("application/x-www-form-urlencoded");
      // if(formData==null){
      //     response = await dio.get(servicePath[url]);
      // }else{
      //     response = await dio.get(servicePath[url],queryParameters:formData);

      // }
       var formData = {'type':2};
    
      response = await dio.get('http://music.it666.com:3666/banner'
      ,queryParameters: formData);
      
      if(response.statusCode==200){
       // print('拿到了数据-------------------------');
        return response.data;
      }else{
          //throw Exception('后端接口出现异常，请检测代码和服务器情况.........');
          return print('数据请求失败');

      }
    }catch(e){
        return print('ERROR:======>${e}');
    }
     
}