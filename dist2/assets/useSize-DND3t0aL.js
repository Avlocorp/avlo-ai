import{R as m,bA as D,w as L,k as h,F as c,bB as M,r as l,bC as I,bp as U,i as _,e as E,bD as W,h as q,d as x,_ as G,b0 as H,aw as J}from"./index-DPJpM76q.js";function k(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=[];return m.Children.forEach(n,function(r){r==null&&!e.keepEmpty||(Array.isArray(r)?o=o.concat(k(r)):D(r)&&r.props?o=o.concat(k(r.props.children,e)):o.push(r))}),o}function cn(n,e){var o=Object.assign({},n);return Array.isArray(e)&&e.forEach(function(r){delete o[r]}),o}function S(n){var e;return n==null||(e=n.getRootNode)===null||e===void 0?void 0:e.call(n)}function K(n){return S(n)instanceof ShadowRoot}function Q(n){return K(n)?S(n):null}function X(n){return n.replace(/-(.)/g,function(e,o){return o.toUpperCase()})}function Y(n,e){L(n,"[@ant-design/icons] ".concat(e))}function N(n){return h(n)==="object"&&typeof n.name=="string"&&typeof n.theme=="string"&&(h(n.icon)==="object"||typeof n.icon=="function")}function R(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(n).reduce(function(e,o){var r=n[o];switch(o){case"class":e.className=r,delete e.class;break;default:delete e[o],e[X(o)]=r}return e},{})}function T(n,e,o){return o?m.createElement(n.tag,c(c({key:e},R(n.attrs)),o),(n.children||[]).map(function(r,t){return T(r,"".concat(e,"-").concat(n.tag,"-").concat(t))})):m.createElement(n.tag,c({key:e},R(n.attrs)),(n.children||[]).map(function(r,t){return T(r,"".concat(e,"-").concat(n.tag,"-").concat(t))}))}function A(n){return M(n)[0]}function j(n){return n?Array.isArray(n)?n:[n]:[]}var Z=`
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,nn=function(e){var o=l.useContext(I),r=o.csp,t=o.prefixCls,a=Z;t&&(a=a.replace(/anticon/g,t)),l.useEffect(function(){var s=e.current,u=Q(s);U(a,"@ant-design-icons",{prepend:!0,csp:r,attachTo:u})},[])},en=["icon","className","onClick","style","primaryColor","secondaryColor"],C={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function on(n){var e=n.primaryColor,o=n.secondaryColor;C.primaryColor=e,C.secondaryColor=o||A(e),C.calculated=!!o}function rn(){return c({},C)}var d=function(e){var o=e.icon,r=e.className,t=e.onClick,a=e.style,s=e.primaryColor,u=e.secondaryColor,y=_(e,en),g=l.useRef(),f=C;if(s&&(f={primaryColor:s,secondaryColor:u||A(s)}),nn(g),Y(N(o),"icon should be icon definiton, but got ".concat(o)),!N(o))return null;var i=o;return i&&typeof i.icon=="function"&&(i=c(c({},i),{},{icon:i.icon(f.primaryColor,f.secondaryColor)})),T(i.icon,"svg-".concat(i.name),c(c({className:r,onClick:t,style:a,"data-icon":i.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},y),{},{ref:g}))};d.displayName="IconReact";d.getTwoToneColors=rn;d.setTwoToneColors=on;function z(n){var e=j(n),o=E(e,2),r=o[0],t=o[1];return d.setTwoToneColors({primaryColor:r,secondaryColor:t})}function tn(){var n=d.getTwoToneColors();return n.calculated?[n.primaryColor,n.secondaryColor]:n.primaryColor}var an=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];z(W.primary);var b=l.forwardRef(function(n,e){var o=n.className,r=n.icon,t=n.spin,a=n.rotate,s=n.tabIndex,u=n.onClick,y=n.twoToneColor,g=_(n,an),f=l.useContext(I),i=f.prefixCls,p=i===void 0?"anticon":i,B=f.rootClassName,$=q(B,p,x(x({},"".concat(p,"-").concat(r.name),!!r.name),"".concat(p,"-spin"),!!t||r.name==="loading"),o),v=s;v===void 0&&u&&(v=-1);var P=a?{msTransform:"rotate(".concat(a,"deg)"),transform:"rotate(".concat(a,"deg)")}:void 0,F=j(y),w=E(F,2),O=w[0],V=w[1];return l.createElement("span",G({role:"img","aria-label":r.name},g,{ref:e,tabIndex:v,onClick:u,className:$}),l.createElement(d,{icon:r,primaryColor:O,secondaryColor:V,style:P}))});b.displayName="AntdIcon";b.getTwoToneColor=tn;b.setTwoToneColor=z;const ln=n=>{const[,,,,e]=H();return e?`${n}-css-var`:""},un=function(n){if(!n)return!1;if(n instanceof Element){if(n.offsetParent)return!0;if(n.getBBox){var e=n.getBBox(),o=e.width,r=e.height;if(o||r)return!0}if(n.getBoundingClientRect){var t=n.getBoundingClientRect(),a=t.width,s=t.height;if(a||s)return!0}}return!1},fn=n=>{const e=m.useContext(J);return m.useMemo(()=>n?typeof n=="string"?n??e:n instanceof Function?n(e):e:e,[n,e])};export{b as I,fn as a,Q as g,un as i,cn as o,k as t,ln as u};
