"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[14],{2522:function(e,s,t){t.d(s,{Z:function(){return l}});var i=t(4165),n=t(5861),r=t(9439),a=t(2791),o=t(1243),c=t(184),l=function(e){var s=e.setRemoveModalOpen,t=e.product,l=e.getUserWishListInfo,d=e.wishList,u=(0,a.useState)(!1),h=(0,r.Z)(u,2),m=h[0],p=h[1],f=function(){var e=(0,n.Z)((0,i.Z)().mark((function e(){var n,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return p(!0),e.prev=1,n=d.find((function(e){return e.id===t.id})),r=t._id?t._id:n._id,e.next=6,o.Z.delete("/remove-item-from-wishlist",{data:{productId:r},withCredentials:!0});case 6:if(200!==e.sent.status){e.next=12;break}return e.next=10,l();case 10:s(!1),document.body.style.overflowY="auto";case 12:p(!1),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(1),console.log(e.t0),p(!1);case 19:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(){return e.apply(this,arguments)}}();return(0,c.jsx)("div",{className:"wishListItemRemoveModalWrapper",onClick:function(e){return e.stopPropagation()},children:(0,c.jsxs)("div",{className:"wishListItemRemoveModalContent",children:[(0,c.jsx)("h5",{className:"wishListItemRemoveModalHeaderTxt",children:"Remove Item"}),(0,c.jsx)("p",{className:"wishListItemRemoveModalTxt",children:"Are you sure you want to remove this item from your wish list?"}),(0,c.jsxs)("div",{className:"wishListItemRemoveModalBtnsWrapper",children:[m?(0,c.jsx)("button",{className:"wishListItemRemoveModalBtn loading",children:(0,c.jsx)("span",{className:"btnLoader"})}):(0,c.jsx)("button",{className:"wishListItemRemoveModalBtn",onClick:function(){return f()},children:"REMOVE"}),(0,c.jsx)("button",{className:"wishListItemRemoveModalBtn cancel",onClick:function(){s(!1),document.body.style.overflowY="auto"},children:"CANCEL"})]})]})})}},7014:function(e,s,t){t.r(s),t.d(s,{default:function(){return c}});var i=t(9439),n=t(2791),r=t(7689),a=t(2522),o=t(184),c=function(e){var s=e.windowWidth,t=e.wishList,c=e.userInfo,l=e.getUserWishListInfo,d=e.isLoggedIn,u=(0,n.useState)(!1),h=(0,i.Z)(u,2),m=h[0],p=h[1],f=(0,n.useState)(null),v=(0,i.Z)(f,2),w=v[0],L=v[1],x=(0,n.useState)(null),j=(0,i.Z)(x,2),N=j[0],g=j[1],I=(0,n.useState)(!1),C=(0,i.Z)(I,2),R=C[0],W=C[1],y=(0,n.useRef)(null),M=(0,r.s0)();return(0,n.useEffect)((function(){d&&l()}),[]),(0,n.useEffect)((function(){m||L(null)}),[m]),(0,n.useEffect)((function(){if(y.current){var e=y.current.getBoundingClientRect();g(e),e.height!==e.width&&W(!R)}}),[y,s,R,t]),d?(0,o.jsx)("section",{className:"wishListWrapper",children:(0,o.jsxs)("div",{className:"wishListContent",children:[(0,o.jsxs)("span",{className:"wishListAccountInfoTxt",children:["Logged in as: ",c.email]}),(0,o.jsx)("h2",{className:"wishListTitle",children:"Wish List"}),(0,o.jsx)("div",{className:"wishListMainContentWrapper",children:(0,o.jsx)("div",{className:"wishListProductsWrapper",children:t.map((function(e,s){return(0,o.jsx)("div",{className:"wishListProductWrapper",children:(0,o.jsxs)("div",{className:"wishListProductContent",onClick:function(){M("/product/".concat(e.id))},children:[(0,o.jsx)("img",{src:e.image,className:"wishListProductImg",alt:"wish list item",onMouseDown:function(e){return e.preventDefault()},ref:y,style:{height:null===N||void 0===N?void 0:N.width}}),(0,o.jsxs)("div",{className:"wishListProductInfoWrapper",children:[(0,o.jsx)("span",{className:"wishListProductCategory",children:e.category.toUpperCase()}),(0,o.jsx)("h4",{className:"wishListProductTitle",children:e.title}),(0,o.jsxs)("span",{className:"wishListProductPrice",children:["$",e.price]}),(0,o.jsx)("div",{className:"wishListProductRemoveBtnWrapper",children:(0,o.jsx)("button",{className:"wishListProductRemoveBtn",onClick:function(e){e.stopPropagation(),L(s),p(!0),document.body.style.overflowY="hidden"},children:"Remove"})}),m&&w===s&&(0,o.jsx)(a.Z,{setRemoveModalOpen:p,product:e,getUserWishListInfo:l,wishList:t})]})]})},s)}))})})]})}):(0,o.jsx)("div",{className:"mainLoaderWrapper",children:(0,o.jsx)("span",{className:"mainLoader"})})}}}]);
//# sourceMappingURL=14.fd3b3bee.chunk.js.map