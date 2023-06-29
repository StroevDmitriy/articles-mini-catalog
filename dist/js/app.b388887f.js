(function(){var t={6894:function(t,e,i){"use strict";var o=i(144),s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[t.loading?e("div",{staticClass:"loader"},[e("img",{attrs:{src:i(7304),alt:"Loader"}})]):e("div",{staticClass:"content"},[e("header",[e("ToolBar")],1),e("main",[e("CategoryList")],1),e("NewAndEditCategoryPopup",{attrs:{categoryToEditID:t.categoryToEditID}}),e("RemoveCategoryPopup"),e("EditArticlePopup",{attrs:{articleToEditID:t.articleToEditID}}),e("button",{staticClass:"reset-state",on:{click:t.resetState}},[t._v("Reset state")])],1)])},r=[],n=(i(7658),i(3907)),a=i(7632),c=i(3168);o.ZP.use(n.ZP);const l=new c.ZP({key:"articles-app",storage:window.localStorage,reducer:t=>({articles:t.articles,categories:t.categories})});var p=new n.ZP.Store({state:{articles:[{id:"0",title:"New title",imgName:"article-image",description:"Description description description description description description description description description description description description description description description description description description description description description description description",likes:400,liked:!1,categories:[]},{id:"1",title:"New title 1",imgName:"article-image",description:"Description description description description description description description description description description description description description description description description description description description description description description description",likes:10,liked:!1,categories:[]},{id:"2",title:"New title 2",imgName:"article-image",description:"Идейные соображения высшего порядка, а также сложившаяся структура организации играет важную роль в формировании существенных финансовых и административных условий. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития.",likes:15,liked:!0,categories:[]},{id:"3",title:"New title 3",imgName:"article-image",description:"Custom dscription",likes:30,liked:!0,categories:[]},{id:"4",title:"New title 4",imgName:"article-image",description:"2 Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription",likes:4,liked:!1,categories:[]},{id:"5",title:"New title 5",imgName:"article-image",description:"3 Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription",likes:355,liked:!1,categories:[]},{id:"6",title:"New title 6",imgName:"article-image",description:" 4 Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription Custom dscription",likes:35,liked:!1,categories:[]},{id:"7",title:"New title 7",imgName:"article-image",description:"7 Description description description description description description description",likes:70,liked:!1,categories:[]},{id:"8",title:"Title 8",imgName:"article-image",description:"8 Description description description",likes:80,liked:!1,categories:[]},{id:"9",title:"Title 9",imgName:"article-image",description:"9 Description ",likes:90,liked:!1,categories:[]},{id:"10",title:"Title 10",imgName:"article-image",description:"10 Description description description description description",likes:100,categories:[]},{id:"11",title:"Title 11",imgName:"article-image",description:"11 Description description ",likes:110,liked:!1,categories:[]}],categories:[],isCategoryPopupVisible:!1,isRemoveCategoryPopupVisible:!1,isEditArticlePopupVisible:!1,categoryIDToRemove:null,categoryToEditID:null,articleToEditID:null},getters:{isCategoryPopupVisible:t=>t.isCategoryPopupVisible,isRemoveCategoryPopupVisible:t=>t.isRemoveCategoryPopupVisible,isEditArticlePopupVisible:t=>t.isEditArticlePopupVisible,getAllCategories:t=>t.categories,getAllArticles:t=>t.articles,getArticlesByNameExceptList:t=>e=>{const i=e.value,o=e.except;return t.articles.filter((t=>!(!t.title||o.includes(t.id))&&t.title.toLowerCase().includes(i.toLowerCase())))},getCategoryByID:t=>e=>t.categories.find((t=>t.id===e)),getArticlesByID:t=>e=>t.articles.filter((t=>e.includes(t.id))),getChildCategories:t=>e=>t.categories.filter((t=>t.parentCategory===e)),getRestArticles:t=>e=>t.articles.filter((t=>!e.includes(t.id))).map((t=>({id:t.id,title:t.title}))),getRestCategories:t=>e=>t.categories.filter((t=>!e.includes(t.id))).map((t=>({id:t.id,title:t.title}))),getCategoryToRemoveID:t=>t.categoryIDToRemove,getCategoryToEditID:t=>t.categoryToEditID,getArticlesCount:(t,e)=>t=>{const i=e.getChildCategories(t);return i.length?i.reduce(((t,i)=>t+e.getArticlesCount(i.id)),e.getCategoryByID(t).articlesID.length):e.getCategoryByID(t).articlesID.length},getArticleToEditID:t=>t.articleToEditID,getCategoriesWithArticle:t=>e=>t.categories.filter((t=>t.articlesID.includes(e))).map((t=>({id:t.id,title:t.title})))},mutations:{toggleArticleLike:(t,e)=>{const{id:i,liked:s}=e,r=t.articles.find((t=>t.id===i));"liked"in r&&s?r.likes--:"liked"in r&&!s?r.likes++:o.ZP.set(r,"likes",1),"liked"in r?r.liked=!r.liked:o.ZP.set(r,"liked",!0)},toggleCategoryPopup:t=>{t.isCategoryPopupVisible=!t.isCategoryPopupVisible},toggleEditArticlePopup:t=>{t.isEditArticlePopupVisible=!t.isEditArticlePopupVisible},toggleRemoveCategoryPopup:t=>{t.isRemoveCategoryPopupVisible=!t.isRemoveCategoryPopupVisible},createCategory:(t,e)=>{t.categories.push({id:(0,a.Z)(),title:e.name,parentCategory:e.parentCategory,articlesID:e.articles})},setCategoryIDToRemove:(t,e)=>{t.categoryIDToRemove=e},removeCategory:(t,e)=>{const i=t.categories.findIndex((t=>t.id===e));t.categories.splice(i,1)},updateCategoryToEditID:(t,e)=>{t.categoryToEditID=e},updateCategory:(t,e)=>{const i=t.categories.findIndex((t=>t.id===e.id)),o=t.categories[i];o.title=e.title,o.parentCategory=e.parentCategory,o.articlesID=e.articlesID},updateArticleToEditID:(t,e)=>{t.articleToEditID=e},updateArticle:(t,e)=>{const i=e.categoriesID,o=e.id;t.categories.forEach((t=>{let e=new Set(t.articlesID);i.includes(t.id)?e.add(o):e.delete(o),t.articlesID=Array.from(e)}))},resetCategories:t=>{t.categories.splice(0)}},actions:{toggleArticleLike({commit:t},e){t("toggleArticleLike",e)},toggleCategoryPopup({commit:t},e){t("updateCategoryToEditID",e),t("toggleCategoryPopup")},toggleEditArticlePopup({commit:t},e){t("updateArticleToEditID",e),t("toggleEditArticlePopup")},createCategory({commit:t},e){t("createCategory",e),t("toggleCategoryPopup")},updateCategory({commit:t},e){t("updateCategory",e),t("toggleCategoryPopup")},updateArticle({commit:t},e){t("updateArticle",e),t("toggleEditArticlePopup")},openRemoveCategoryPopup({commit:t},e){t("setCategoryIDToRemove",e),t("toggleRemoveCategoryPopup")},closeRemoveCategoryPopup({commit:t}){t("toggleRemoveCategoryPopup")},clickRemoveCategory({dispatch:t,commit:e},i){t("removeCategory",i),e("toggleRemoveCategoryPopup")},removeCategory({dispatch:t,commit:e,state:i},o){const s=i.categories.filter((t=>t.parentCategory===o));s.length&&s.forEach((e=>{t("removeCategory",e.id)})),e("removeCategory",o)},resetState({commit:t}){t("resetCategories")}},modules:{},plugins:[l.plugin]}),u=function(){var t=this,e=t._self._c;return e("div",{staticClass:"toolbar"},[e("CreateCategoryButton",{staticClass:"toolbar__create-category-button"}),e("ArticleSearchLine")],1)},d=[],g=function(){var t=this,e=t._self._c;return e("CustomButton",{staticClass:"create-category-button",attrs:{"button-label":"Создать категорию","button-type":"action"},on:{click:t.openCategoryPopup}})},m=[],C=function(){var t=this,e=t._self._c;return e("button",{class:["custom-button",{"action-button":"action"===t.buttonType,"passive-button":"passive"===t.buttonType,"inactive-button":"inactive"===t.buttonType,"custom-button__full-width":t.fullWidth}],attrs:{type:"button"},on:{click:t.click}},[t._v(t._s(t.buttonLabel)+" ")])},y=[],h={name:"CustomButton",components:{},props:{buttonLabel:{default:"Текст кнопки",type:String},buttonType:{default:"passive",type:String,validator(t){return["action","passive"].includes(t)}},fullWidth:{default:!1,type:Boolean}},data(){return{}},methods:{click(){this.$emit("click")}}},v=h,_=i(1001),f=(0,_.Z)(v,C,y,!1,null,"6883c14c",null),b=f.exports,k={name:"CreateCategoryButton",components:{CustomButton:b},data(){return{}},methods:{openCategoryPopup(){p.dispatch("toggleCategoryPopup")}}},P=k,I=(0,_.Z)(P,g,m,!1,null,"ae141464",null),A=I.exports,w=function(){var t=this,e=t._self._c;return e("CustomInput",{staticClass:"searh-article",attrs:{placeholder:"Найти статью","ico-name":"search",type:"input"}})},D=[],O=function(){var t=this,e=t._self._c;return e("div",{staticClass:"custom-input"},[e("input",{staticClass:"custom-input__field",attrs:{type:"text",placeholder:" ",readonly:t.noType},domProps:{value:t.value},on:{click:function(e){return t.inputClicked(e.target.value)},input:function(e){return t.inputValueInputed(e.target.value)},change:function(e){return t.inputValueChanged(e.target.value)},blur:t.inputBlurred}}),t.placeholder?e("div",{staticClass:"custom-input__placeholder"},[t._v(t._s(t.placeholder))]):t._e(),t.icoName?e("div",{staticClass:"custom-input__icon"},[e("img",{attrs:{src:i(2498)(`./${t.icoName}.svg`),alt:"Icon"}})]):t._e(),"select"===t.type?e("div",{staticClass:"custom-input__icon"},[e("img",{attrs:{src:i(1876),alt:"Select ico"}})]):t._e()])},T=[],S={name:"CustomInput",components:{},props:{placeholder:{type:String,default:"Custom placeholder"},icoName:{type:String,default:""},type:{type:String,default:"input"},fieldName:{type:String,default:""},value:{type:String,default:""},noType:{type:Boolean,default:!1}},data(){return{}},methods:{inputClicked(){this.$emit("click",this.fieldName)},inputValueInputed(t){this.$emit("input",{name:this.fieldName,value:t})},inputValueChanged(t){this.$emit("change",{name:this.fieldName,value:t})},inputBlurred(){this.$emit("blur")}}},E=S,x=(0,_.Z)(E,O,T,!1,null,"4db33665",null),N=x.exports,V={name:"ArticleSearchLine",components:{CustomInput:N},data(){return{}}},B=V,R=(0,_.Z)(B,w,D,!1,null,"b380bd9a",null),L=R.exports,Z={name:"ToolBar",components:{CreateCategoryButton:A,ArticleSearchLine:L}},$=Z,M=(0,_.Z)($,u,d,!1,null,"34ac2f19",null),W=M.exports,j=function(){var t=this,e=t._self._c;return e("div",[t.categoriesData.length?e("div",t._l(t.categoriesData,(function(i){return e("section",{key:i.id},[null==i.parentCategory?e("CategoryContent",{attrs:{hasParent:!1,id:i.id,title:i.title,articlesID:i.articlesID}}):t._e()],1)})),0):e("section",{staticClass:"empty-list-message"},[e("strong",[t._v("Пока нет статей")]),e("p",[t._v("Создайте свою первую категорию и добавьте в неё статьи.")]),e("CreateCategoryButton")],1)])},H=[],F=function(){var t=this,e=t._self._c;return e("section",{class:["category",{category_child:!t.isParentCategory}]},[e("div",{staticClass:"category__header"},[t.isParentCategory?e("h2",[t._v(t._s(t.title)+" "),e("span",[t._v("("+t._s(t.articlesCount)+")")])]):e("h3",[t._v(t._s(t.title)+" "),e("span",[t._v("("+t._s(t.articlesCount)+")")])]),e("div",{staticClass:"category__buttons"},[e("button",{class:["category__toggle-collapse",{"category__toggle-collapse_collapsed":t.isCategoryShown}],on:{click:t.toggleCategoryVisibility}},[e("img",{attrs:{src:i(7164),alt:"Show/Hide"}})]),e("div",{staticClass:"category__menu-block"},[e("button",{staticClass:"category__menu-button",on:{click:t.toggleCategoryMenuVisibility,blur:t.onClickOutside}},[e("img",{attrs:{src:i(9749),alt:"Menu"}})]),e("div",{staticClass:"category__menu",class:["category__menu",{category__menu_collapsed:!t.isCategoryMenuShown}]},[e("button",{staticClass:"category__button category__edit",attrs:{type:"button"},on:{mousedown:t.openCategoryPopup}},[t._v("Редактировать")]),e("button",{staticClass:"category__button category__remove",attrs:{type:"button"},on:{mousedown:t.openRemoveCategoryPopup}},[t._v("Удалить")])])])])]),e("section",{ref:"categoryContent",class:["category__content",{category__content_hided:!t.isCategoryShown}],style:{"max-height":t.isCategoryShown?t.contentMaxHeight+"px":0}},[e("section",{staticClass:"category__articles-list"},t._l(t.categoryArticles,(function(t){return e("ArticleCard",{key:t.id,attrs:{title:t.title,previewName:t.imgName,description:t.description,likes:t.likes,liked:t.liked}})})),1),t.childCategoriesData.length?e("div",t._l(t.childCategoriesData,(function(t){return e("CategoryContent",{key:t.id,attrs:{id:t.id,isParentCategory:!1,title:t.title,articlesID:t.articlesID,childCategoriesID:t.childCategoriesID}})})),1):t._e()])])},U=[],q=function(){var t=this,e=t._self._c;return e("article",{staticClass:"article-card"},[e("div",{staticClass:"article-card__interaction-row"},[e("button",{staticClass:"article-card__like-button",attrs:{type:"button"},on:{click:function(e){return t.toggleLike(t.$vnode.key,t.liked)}}},[t.liked?e("img",{attrs:{src:i(1600),alt:"Like"}}):e("img",{attrs:{src:i(9451),alt:"Like"}}),t._v(" "+t._s(t.likes)+" ")]),e("button",{staticClass:"article-card__edit-button",attrs:{type:"button"},on:{click:t.openEditArticlePopup}},[e("img",{attrs:{src:i(8931),alt:"Like"}})])]),e("div",{staticClass:"article-card__preview-container"},[e("img",{attrs:{src:i(260)(`./${t.previewName}.png`),alt:"Article preview"}})]),e("h4",{staticClass:"article-card__title"},[t._v(t._s(t.title))]),e("p",{staticClass:"article-card__description"},[t._v(t._s(t.description))])])},z=[],G={name:"ArticleCard",components:{},props:{previewName:{type:String,default:"article-image"},title:{type:String,default:"Нет заголовка"},description:{type:String,default:"Нет описания"},likes:{type:Number,default:0},liked:{type:Boolean,default:!1}},data(){return{}},methods:{toggleLike(t,e){p.dispatch("toggleArticleLike",{id:t,liked:e})},openEditArticlePopup(){p.dispatch("toggleEditArticlePopup",this.$vnode.key)}}},J=G,K=(0,_.Z)(J,q,z,!1,null,"74da25b2",null),Q=K.exports,X={name:"CategoryContent",components:{ArticleCard:Q},props:{id:{type:String},title:{type:String,default:""},articlesID:{type:Array,default:()=>[]},childCategoriesID:{type:Array,default:()=>[]},isParentCategory:{type:Boolean,default:!0},hasParent:{type:Boolean,default:!0}},data(){return{isCategoryShown:!0,isCategoryMenuShown:!1,contentMaxHeight:null}},computed:{categoryArticles(){return p.getters.getArticlesByID(this.articlesID)},childCategoriesData(){const t=p.getters.getChildCategories(this.id);return t.length?t:[]},articlesCount(){return p.getters.getArticlesCount(this.id)}},methods:{toggleCategoryVisibility(){this.isCategoryShown=!this.isCategoryShown},toggleCategoryMenuVisibility(){this.isCategoryMenuShown=!this.isCategoryMenuShown},onClickOutside(){this.isCategoryMenuShown=!1},openRemoveCategoryPopup(){p.dispatch("openRemoveCategoryPopup",this.id)},openCategoryPopup(){p.dispatch("toggleCategoryPopup",this.id)},async countMaxHeight(){this.contentMaxHeight=this.$refs.categoryContent.scrollHeight,await this.$nextTick(),this.hasParent&&(this.isCategoryShown=!1)}},mounted(){this.countMaxHeight()},watch:{childCategoriesData:async function(){await this.$nextTick(),this.countMaxHeight()}}},Y=X,tt=(0,_.Z)(Y,F,U,!1,null,"8368f7e2",null),et=tt.exports,it={name:"ArticlesList",components:{CreateCategoryButton:A,CategoryContent:et},data(){return{categoriesData:[]}},computed:{},methods:{},created(){this.categoriesData=p.getters.getAllCategories}},ot=it,st=(0,_.Z)(ot,j,H,!1,null,"16862d20",null),rt=st.exports,nt=function(){var t=this,e=t._self._c;return e("div",{class:["popup-container",{"popup-container__shown":t.isCategoryPopupVisible}]},[e("div",{staticClass:"popup-container__overlay",on:{click:t.closePopup}}),e("section",{staticClass:"popup-container__popup common-popup"},[e("form",{attrs:{action:""}},[t.categoryToEditID?e("h3",[t._v("Редактирование категории")]):e("h3",[t._v("Новая категория")]),e("fieldset",{staticClass:"common-popup__fields"},[e("CustomInput",{staticClass:"common-popup__input",attrs:{type:"input",placeholder:"Название",value:t.categoryName},on:{change:function(e){return t.onInputChanged(e.value,"categoryName")}}}),e("div",{staticClass:"common-popup__field-container"},[e("div",{staticClass:"common-popup__input-container"},[e("CustomInput",{staticClass:"common-popup__input select",attrs:{fieldName:"parentCategoryOptions",type:"select",placeholder:"Родительская категория (необязательно)",value:t.categoryParentTitle,noType:""},on:{click:function(e){return t.openParentCategoryOptions(e)},blur:function(e){return t.hideOptions("parentCategoryOptions")}}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.parentCategoryOptions.isVisible,expression:"parentCategoryOptions.isVisible"}],staticClass:"select__options"},[e("button",{staticClass:"select__option",attrs:{type:"button"},on:{mousedown:function(e){return t.chooseParentCategoryOption("")}}},[e("span",[t._v("(Нет родительской категории)")])]),t._l(t.parentCategoryOptions.value,(function(i){return e("button",{key:i.categoryId,staticClass:"select__option",attrs:{type:"button"},on:{mousedown:function(e){return t.chooseParentCategoryOption(i)}}},[t._v(" "+t._s(i.title)+" ")])}))],2)],1)]),e("div",{staticClass:"common-popup__field-container"},[e("div",{staticClass:"common-popup__input-container"},[e("CustomInput",{staticClass:"common-popup__input select",attrs:{type:"select",placeholder:"Вложенные статьи",fieldName:"innerArticlesOptions"},on:{input:t.onInputInputed,click:function(e){return t.openInnerArticlesOptions(e)},blur:function(e){return t.hideOptions("innerArticlesOptions")}}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.innerArticlesOptions.isVisible,expression:"innerArticlesOptions.isVisible"}],staticClass:"select__options"},t._l(t.innerArticlesOptions.value,(function(i){return e("button",{key:i.id,staticClass:"select__option",attrs:{type:"button"},on:{mousedown:function(e){return t.chooseInnerArticlesOption({id:i.id,title:i.title})}}},[t._v(" "+t._s(i.title)+" ")])})),0)],1),e("div",{staticClass:"select__selected-options"},t._l(t.innerArticlesSelected,(function(i){return e("div",{key:i.id,staticClass:"select__selected-option"},[e("button",{staticClass:"select__remove-option-button",attrs:{type:"button"},on:{click:function(e){return t.removeSelectedArticle(i.id)}}}),t._v(" "+t._s(i.title)+" ")])})),0)])],1),e("fieldset",{staticClass:"common-popup__buttons"},[e("CustomButton",{staticClass:"common-popup__button common-popup__save-button",attrs:{buttonLabel:"Сохранить",buttonType:"action",fullWidth:!0},on:{click:t.saveCategory}}),e("CustomButton",{staticClass:"common-popup__button",attrs:{buttonLabel:"Отмена",buttonType:"passive",fullWidth:!0},on:{click:t.closePopup}})],1)])])])},at=[],ct={name:"NewAndEditCategoryPopup",components:{CustomInput:N,CustomButton:b},props:{categoryToEditID:{type:String||null,default:null}},data(){return{categoryName:"",categoryParentId:"",categoryParentTitle:"",innerArticlesSelected:[],parentCategoryOptions:{isVisible:!1,value:[]},innerArticlesOptions:{isVisible:!1,value:[]}}},computed:{isCategoryPopupVisible(){return p.getters.isCategoryPopupVisible}},methods:{saveCategory(){this.categoryToEditID?this.updateCategory():this.createCategory()},createCategory(){p.dispatch("createCategory",{name:this.categoryName,parentCategory:this.categoryParentId||null,articles:this.innerArticlesSelected.map((t=>t.id))}),this.resetFields()},updateCategory(){p.dispatch("updateCategory",{id:this.categoryToEditID,title:this.categoryName,parentCategory:this.categoryParentId||null,articlesID:this.innerArticlesSelected.map((t=>t.id))})},resetFields(){this.categoryName="",this.categoryParentId="",this.categoryParentTitle="",this.innerArticlesSelected=[]},closePopup(){p.dispatch("toggleCategoryPopup")},showOptions(t){this.$data[t].isVisible=!0},hideOptions(t){this.$data[t].isVisible=!1},openParentCategoryOptions(t){this.$data[t].value=p.getters.getAllCategories,this.showOptions(t)},chooseParentCategoryOption(t){this.categoryParentTitle=t.title,this.categoryParentId=t.id,this.hideOptions("parentCategoryOptions")},openInnerArticlesOptions(t){this.innerArticlesOptions.value=p.getters.getRestArticles(this.innerArticlesSelected.map((t=>t.id))),this.showOptions(t)},chooseInnerArticlesOption(t){this.innerArticlesSelected.push(t),this.hideOptions("innerArticlesOptions")},removeSelectedArticle(t){const e=this.innerArticlesSelected.findIndex((e=>e.id==t));this.innerArticlesSelected.splice(e,1)},onInputChanged(t,e){this[e]=t},onInputInputed(t){const e=this.$data[t.name];this.showOptions(t.name),e.value=p.getters.getArticlesByNameExceptList({value:t.value,except:this.innerArticlesSelected.map((t=>t.id))}),e.isVisible=!!this.innerArticlesOptions.value.length}},watch:{categoryToEditID(t){if(t){let{title:t,parentCategory:e,articlesID:i}=p.getters.getCategoryByID(this.categoryToEditID);this.categoryName=t,this.categoryParentId=e,this.categoryParentTitle=p.getters.getCategoryByID(e)?.title,this.innerArticlesSelected=p.getters.getArticlesByID(i).map((t=>({id:t.id,title:t.title})))}else this.resetFields()}}},lt=ct,pt=(0,_.Z)(lt,nt,at,!1,null,null,null),ut=pt.exports,dt=function(){var t=this,e=t._self._c;return e("div",{class:["popup-container",{"popup-container__shown":t.isRemoveCategoryPopupVisible}]},[e("div",{staticClass:"popup-container__overlay",on:{click:t.closePopup}}),e("section",{staticClass:"popup-container__popup remove-category-popup"},[e("div",{staticClass:"remove-category-popup__ico-container"}),t._m(0),e("div",{staticClass:"remove-category-popup__buttons"},[e("CustomButton",{staticClass:"remove-category-popup__button remove-category-popup__remove-button",attrs:{buttonLabel:"Удалить",buttonType:"action",fullWidth:!1},on:{click:t.removeCategory}}),e("CustomButton",{staticClass:"remove-category-popup__button remove-category-popup__cancel-button",attrs:{buttonLabel:"Отмена",buttonType:"passive",fullWidth:!1},on:{click:t.closePopup}})],1)])])},gt=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"remove-category-popup__content"},[e("h4",[t._v("Удалить категорию?")]),e("p",[t._v("Все дочерние категории удалятся.")])])}],mt={name:"RemoveCategoryPopup",components:{CustomButton:b},data(){return{}},computed:{isRemoveCategoryPopupVisible(){return p.getters.isRemoveCategoryPopupVisible}},methods:{closePopup(){p.dispatch("closeRemoveCategoryPopup")},removeCategory(){p.dispatch("clickRemoveCategory",p.getters.getCategoryToRemoveID)}}},Ct=mt,yt=(0,_.Z)(Ct,dt,gt,!1,null,"2d250544",null),ht=yt.exports,vt=function(){var t=this,e=t._self._c;return e("div",{class:["popup-container",{"popup-container__shown":t.isEditArticlePopupVisible}]},[e("div",{staticClass:"popup-container__overlay",on:{click:t.closePopup}}),e("section",{staticClass:"popup-container__popup common-popup"},[e("form",{attrs:{action:""}},[e("h3",[t._v("Изменение расположения статьи")]),e("fieldset",{staticClass:"common-popup__fields"},[e("div",{staticClass:"common-popup__field-container"},[e("div",{staticClass:"common-popup__input-container"},[e("CustomInput",{staticClass:"common-popup__input select",attrs:{type:"select",placeholder:"Категория (может быть несколько, необязательно)",fieldName:"categoriesOptions",noType:""},on:{click:function(e){return t.openCategoriesOptions(e)},blur:function(e){return t.hideOptions("categoriesOptions")}}}),e("div",{directives:[{name:"show",rawName:"v-show",value:t.categoriesOptions.isVisible,expression:"categoriesOptions.isVisible"}],staticClass:"select__options"},t._l(t.categoriesOptions.value,(function(i){return e("button",{key:i.id,staticClass:"select__option",attrs:{type:"button"},on:{mousedown:function(e){return t.chooseCategoriesOption({id:i.id,title:i.title})}}},[t._v(" "+t._s(i.title)+" ")])})),0)],1),e("div",{staticClass:"select__selected-options"},t._l(t.categoriesSelected,(function(i){return e("div",{key:i.id,staticClass:"select__selected-option"},[e("button",{staticClass:"select__remove-option-button",attrs:{type:"button"},on:{click:function(e){return t.removeSelectedCategory(i.id)}}}),t._v(" "+t._s(i.title)+" ")])})),0)])]),e("fieldset",{staticClass:"common-popup__buttons"},[e("CustomButton",{staticClass:"common-popup__button common-popup__save-button",attrs:{buttonLabel:"Сохранить",buttonType:"action",fullWidth:!0},on:{click:t.updateArticle}}),e("CustomButton",{staticClass:"common-popup__button",attrs:{buttonLabel:"Отмена",buttonType:"passive",fullWidth:!0},on:{click:t.closePopup}})],1)])])])},_t=[],ft={name:"EditArticlePopup",components:{CustomButton:b,CustomInput:N},props:{articleToEditID:{type:String||null,default:null}},data(){return{categoriesSelected:[],categoriesOptions:{isVisible:!1,value:[]}}},computed:{isEditArticlePopupVisible(){return p.getters.isEditArticlePopupVisible}},methods:{updateArticle(){p.dispatch("updateArticle",{id:this.articleToEditID,categoriesID:this.categoriesSelected.map((t=>t.id))})},closePopup(){p.dispatch("toggleEditArticlePopup")},openCategoriesOptions(t){this.categoriesOptions.value=p.getters.getRestCategories(this.categoriesSelected.map((t=>t.id))),this.showOptions(t)},onInputChanged(t,e){this[e]=t},showOptions(t){this.$data[t].isVisible=!0},hideOptions(t){this.$data[t].isVisible=!1},chooseCategoriesOption(t){this.categoriesSelected.push(t),this.hideOptions("categoriesOptions")},removeSelectedCategory(t){const e=this.categoriesSelected.findIndex((e=>e.id==t));this.categoriesSelected.splice(e,1)}},watch:{articleToEditID(t){this.categoriesSelected=p.getters.getCategoriesWithArticle(t)}}},bt=ft,kt=(0,_.Z)(bt,vt,_t,!1,null,null,null),Pt=kt.exports,It={name:"App",components:{ToolBar:W,CategoryList:rt,NewAndEditCategoryPopup:ut,RemoveCategoryPopup:ht,EditArticlePopup:Pt},computed:{categoryToEditID(){return p.getters.getCategoryToEditID},articleToEditID(){return p.getters.getArticleToEditID}},data(){return{loading:!0}},methods:{resetState(){p.dispatch("resetState")}},created(){setTimeout((()=>{this.loading=!1}),1e3)}},At=It,wt=(0,_.Z)(At,s,r,!1,null,null,null),Dt=wt.exports;o.ZP.config.productionTip=!1,new o.ZP({store:p,render:t=>t(Dt)}).$mount("#app")},260:function(t,e,i){var o={"./article-image.png":5551};function s(t){var e=r(t);return i(e)}function r(t){if(!i.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}s.keys=function(){return Object.keys(o)},s.resolve=r,t.exports=s,s.id=260},2498:function(t,e,i){var o={"./chevron-down.svg":7164,"./chevron-up.svg":3475,"./delete.svg":1734,"./left.svg":2275,"./like_active.svg":1600,"./like_default.svg":9451,"./loader.svg":7304,"./menu.svg":9749,"./pen.svg":8931,"./plus.svg":732,"./question-circle.svg":4941,"./right.svg":2944,"./search.svg":1868,"./select-down.svg":1876,"./select-up.svg":1507};function s(t){var e=r(t);return i(e)}function r(t){if(!i.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}s.keys=function(){return Object.keys(o)},s.resolve=r,t.exports=s,s.id=2498},7164:function(t,e,i){"use strict";t.exports=i.p+"img/chevron-down.0f24e972.svg"},3475:function(t,e,i){"use strict";t.exports=i.p+"img/chevron-up.a7242b5e.svg"},1734:function(t,e,i){"use strict";t.exports=i.p+"img/delete.a3dbe59e.svg"},2275:function(t,e,i){"use strict";t.exports=i.p+"img/left.78ad6574.svg"},1600:function(t,e,i){"use strict";t.exports=i.p+"img/like_active.3bf58f5a.svg"},9451:function(t,e,i){"use strict";t.exports=i.p+"img/like_default.ab0d87f6.svg"},7304:function(t,e,i){"use strict";t.exports=i.p+"img/loader.4dae2cb2.svg"},9749:function(t,e,i){"use strict";t.exports=i.p+"img/menu.fb4d8801.svg"},8931:function(t,e,i){"use strict";t.exports=i.p+"img/pen.399eb7a7.svg"},732:function(t,e,i){"use strict";t.exports=i.p+"img/plus.84e307bd.svg"},4941:function(t,e,i){"use strict";t.exports=i.p+"img/question-circle.4bc65a18.svg"},2944:function(t,e,i){"use strict";t.exports=i.p+"img/right.2bbcea01.svg"},1868:function(t,e,i){"use strict";t.exports=i.p+"img/search.26425682.svg"},1876:function(t,e,i){"use strict";t.exports=i.p+"img/select-down.afc706ce.svg"},1507:function(t,e,i){"use strict";t.exports=i.p+"img/select-up.7cb1a153.svg"},5551:function(t,e,i){"use strict";t.exports=i.p+"img/article-image.584a5865.png"}},e={};function i(o){var s=e[o];if(void 0!==s)return s.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,o,s,r){if(!o){var n=1/0;for(p=0;p<t.length;p++){o=t[p][0],s=t[p][1],r=t[p][2];for(var a=!0,c=0;c<o.length;c++)(!1&r||n>=r)&&Object.keys(i.O).every((function(t){return i.O[t](o[c])}))?o.splice(c--,1):(a=!1,r<n&&(n=r));if(a){t.splice(p--,1);var l=s();void 0!==l&&(e=l)}}return e}r=r||0;for(var p=t.length;p>0&&t[p-1][2]>r;p--)t[p]=t[p-1];t[p]=[o,s,r]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var o in e)i.o(e,o)&&!i.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.p="/articles-mini-catalog/"}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,o){var s,r,n=o[0],a=o[1],c=o[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(s in a)i.o(a,s)&&(i.m[s]=a[s]);if(c)var p=c(i)}for(e&&e(o);l<n.length;l++)r=n[l],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(p)},o=self["webpackChunkarticles_mini_catalog"]=self["webpackChunkarticles_mini_catalog"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=i.O(void 0,[998],(function(){return i(6894)}));o=i.O(o)})();
//# sourceMappingURL=app.b388887f.js.map