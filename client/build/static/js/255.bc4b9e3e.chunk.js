"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[255],{6255:function(e,s,a){a.r(s),a.d(s,{default:function(){return p}});var r=a(4165),t=a(5861),n=a(9439),i=a(2791),o=a(1243),c=a(184),p=function(e){e.windowWidth;var s=e.shoppingCart,a=e.userInfo,p=e.getUserCartInfo,l=e.isLoggedIn,d=(0,i.useState)(!1),h=(0,n.Z)(d,2),u=h[0],m=h[1],v=(0,i.useState)(null),C=(0,n.Z)(v,2),x=C[0],g=C[1],N=(0,i.useState)(0),j=(0,n.Z)(N,2),f=j[0],w=j[1],y=(0,i.useState)(0),B=(0,n.Z)(y,2),I=B[0],O=B[1],V=(0,i.useState)(!1),b=(0,n.Z)(V,2),k=b[0],W=b[1],P=(0,i.useState)(!1),T=(0,n.Z)(P,2),S=T[0],Z=T[1];(0,i.useEffect)((function(){l&&p()}),[]);var R=function(){k||(g(null),m(!1),document.body.style.overflowY="auto")};(0,i.useEffect)((function(){var e=s.map((function(e){return e.productQuantity}));w(e.reduce((function(e,s){return e+s}),0));var a=s.map((function(e){return e.productQuantity*e.price}));O(a.reduce((function(e,s){return e+s}),0))}),[s]);var M=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(s){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return W(!0),e.prev=1,e.next=4,o.Z.delete("http://localhost:5000/remove-product",{data:{productId:s},withCredentials:!0});case 4:if(200!==e.sent.status){e.next=9;break}return e.next=8,p();case 8:R();case 9:W(!1),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0),W(!1);case 16:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(s){return e.apply(this,arguments)}}(),E=function(){var e=(0,t.Z)((0,r.Z)().mark((function e(){var a,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z(!0),e.prev=1,e.next=4,o.Z.post("http://localhost:5000/create-checkout-session",s,{withCredentials:!0});case 4:200===(a=e.sent).status&&(t=a.data.url,window.location.href=t),Z(!1),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0),Z(!1);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}();return l?(0,c.jsx)("section",{className:"shoppingCartWrapper",children:(0,c.jsxs)("div",{className:"shoppingCartContent",children:[(0,c.jsxs)("span",{className:"shoppingCartAccountInfoTxt",children:["Logged in as: ",a.email]}),(0,c.jsx)("h2",{className:"shoppingCartTitle",children:"Shopping Cart"}),(0,c.jsxs)("div",{className:"shoppingCartMainContentWrapper",children:[(0,c.jsx)("div",{className:"shoppingCartProductsWrapper",children:s.map((function(e,s){return(0,c.jsx)("div",{className:"shoppingCartProductWrapper ".concat(0===s?"firstProduct":""),children:(0,c.jsxs)("div",{className:"shoppingCartProductContent",children:[(0,c.jsx)("img",{src:e.image,className:"shoppingCartProductImg",alt:"shopping cart product",onMouseDown:function(e){return e.preventDefault()}}),(0,c.jsxs)("div",{className:"shoppingCartProductInfoWrapper",children:[(0,c.jsx)("h4",{className:"shoppingCartProductTitle",children:e.title}),(0,c.jsxs)("span",{className:"shoppingCartProductColorTxt",children:["Color: ",e.color.toUpperCase()]}),(0,c.jsxs)("span",{className:"shoppingCartProductSizeTxt",children:["Size: ",e.size]}),(0,c.jsxs)("span",{className:"shoppingCartProductQuantityTxt",children:["Quantity: ",e.productQuantity]}),(0,c.jsxs)("div",{className:"shoppingCartProductPricesWrapper",children:[(0,c.jsxs)("span",{className:"shoppingCartProductPrice",children:["$",e.price]}),(0,c.jsxs)("span",{className:"shoppingCartProductSubTotal",children:["SubTotal: $",e.price*e.productQuantity]})]}),(0,c.jsx)("div",{className:"shoppingCartProductRemoveBtnWrapper",children:(0,c.jsx)("button",{className:"shoppingCartProductRemoveBtn",onClick:function(){return S?null:(g(s),m(!0),void(document.body.style.overflowY="hidden"))},children:"Remove"})}),u&&x===s&&(0,c.jsx)("div",{className:"shoppingCartRemoveModalWrapper",children:(0,c.jsxs)("div",{className:"shoppingCartRemoveModalContent",children:[(0,c.jsx)("h5",{className:"shoppingCartRemoveModalHeaderTxt",children:"Remove Item"}),(0,c.jsx)("p",{className:"shoppingCartRemoveModalTxt",children:"Are you sure you want to remove this item from your cart?"}),(0,c.jsxs)("div",{className:"shoppingCartRemoveModalBtnsWrapper",children:[k?(0,c.jsx)("button",{className:"shoppingCartRemoveModalBtn loading",children:(0,c.jsx)("span",{className:"btnLoader"})}):(0,c.jsx)("button",{className:"shoppingCartRemoveModalBtn",onClick:function(){return M(e._id.toString())},children:"REMOVE"}),(0,c.jsx)("button",{className:"shoppingCartRemoveModalBtn cancel",onClick:function(){return R()},children:"CANCEL"})]})]})})]})]})},s)}))}),(0,c.jsxs)("div",{className:"shoppingCartCheckOutWrapper",children:[(0,c.jsxs)("div",{className:"shoppingCartOverViewWrapper",children:[(0,c.jsxs)("div",{className:"shoppingCartOverViewHeader",children:[(0,c.jsx)("h3",{className:"overViewHeaderTitle",children:"Order Summary"}),(0,c.jsxs)("span",{className:"overViewHeaderItemCount",children:[f||0," Item(s)"]})]}),(0,c.jsxs)("div",{className:"shoppingCartOverViewBody",children:[(0,c.jsxs)("div",{className:"shoppingCartOverViewBodyItemWrapper top",children:[(0,c.jsx)("span",{className:"shoppingCartOverViewBodyItem",children:"Item(s) Subtotal"}),(0,c.jsxs)("span",{className:"shoppingCartOverViewBodyItem",children:["$",I||0]})]}),(0,c.jsxs)("div",{className:"shoppingCartOverViewBodyItemWrapper",children:[(0,c.jsx)("span",{className:"shoppingCartOverViewBodyItem",children:"Shipping"}),(0,c.jsx)("span",{className:"shoppingCartOverViewBodyItem",children:"TBD"})]}),(0,c.jsxs)("div",{className:"shoppingCartOverViewBodyItemWrapper",children:[(0,c.jsx)("span",{className:"shoppingCartOverViewBodyItem",children:"Subtotal"}),(0,c.jsxs)("span",{className:"shoppingCartOverViewBodyItem",children:["$",I||0]})]}),(0,c.jsxs)("div",{className:"shoppingCartOverViewBodyItemWrapper bottom",children:[(0,c.jsx)("span",{className:"shoppingCartOverViewBodyItem",children:"Estimated Tax"}),(0,c.jsx)("span",{className:"shoppingCartOverViewBodyItem",children:"TBD"})]})]}),(0,c.jsxs)("div",{className:"shoppingCartOverViewFooter",children:[(0,c.jsx)("h3",{className:"overViewFooterTitle",children:"Order Total"}),(0,c.jsxs)("span",{className:"overViewFooterItemCount",children:["$",I||0]})]})]}),S?(0,c.jsx)("button",{className:"shoppingCartCheckOutBtn loading",children:(0,c.jsx)("span",{className:"btnLoader"})}):(0,c.jsx)("div",{className:"shoppingCartCheckOutBtnWrapper",onClick:function(){return E()},children:(0,c.jsx)("button",{className:"shoppingCartCheckOutBtn",children:"CHECKOUT"})})]})]})]})}):(0,c.jsx)("div",{className:"mainLoaderWrapper",children:(0,c.jsx)("span",{className:"mainLoader"})})}}}]);
//# sourceMappingURL=255.bc4b9e3e.chunk.js.map