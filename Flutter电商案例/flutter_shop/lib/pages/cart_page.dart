import 'package:flutter/material.dart';
import 'package:flutter_shop/provide/counter.dart';
import 'package:provide/provide.dart';
import './../provide/counter.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import './../provide/cart.dart';
import './../pages/cart_page/cart_item.dart';
import './cart_page/cart_bottom.dart';
class CartPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('购物车'),
        ),
        body: FutureBuilder(
          future: _getCartInfo(context),
           builder: (context, snapshot) {
           // print("====================>"+ "购物车加载");
            List cartList = Provide.value<CartProvide>(context).cartList;
            if (snapshot.hasData) {
             
             return Stack(
              children: <Widget>[
                
                Provide<CartProvide>(
                  builder: (context,child,childCategory){
                    cartList = Provide.value<CartProvide>(context).cartList;
                    return  ListView.builder(
                      itemCount: cartList.length,
                      itemBuilder: (context,index){
                    return CartItem(cartList[index]);
                    },
                   );
                  },
                ),
               
                
                
                Positioned(
                  bottom:0,
                  left:0,
                  child: CartBottom(),
                )
              ],
            );
           
           
            } else {
              return Text('正在加载');
            }
          },
        ));
  }

  Future<String> _getCartInfo(BuildContext context) async {
    await Provide.value<CartProvide>(context).getCartInfo();
    return 'end';
  }
}

// // 测试状态管理
// class Number extends StatelessWidget {

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       margin: EdgeInsets.only(top:200),
//       //child:Text('0')
//       //添加状态管理
//       child:  Provide<Counter>(builder:
//       (context,child,counter){
//          return Text(
//            '${counter.value}',
//             style: Theme.of(context).textTheme.display1,
//          );
//       },),
//     );
//   }
// }

// class MyButton extends StatelessWidget {

//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       child:RaisedButton(
//         onPressed: (){
//           Provide.value<Counter>(context).increment();
//         },
//         child: Text('递增'),
//       )
//     );
//   }
// }
