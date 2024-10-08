---
# 这是文章的标题
title: 3、事件处理
# 你可以自定义封面图片
#cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: file
# 这是侧边栏的顺序
order: 3
# 设置作者
author: bugcode
# 设置写作时间
date: 2020-01-01
# 一个页面可以有多个分类
category:
  - REACT
  - 前端
# 一个页面可以有多个标签
tag:
  - 前端
  - react
# 此页面会在文章列表置顶
sticky: false
# 此页面会出现在星标文章中
star: true
# 你可以自定义页脚
footer: Spring基础
# 你可以自定义版权信息
copyright: bugcode
---

# 3、事件处理


React的事件是通过onXxx属性指定事件处理函数


React 使用的是自定义事件，而不是原生的 DOM 事件


React 的事件是通过事件委托方式处理的，向上委托（为了更加的高效）


可以通过事件的 event.target.value获取发生的 DOM 元素对象，可以尽量减少 refs的使用


事件中必须返回的是函数


1.React事件

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：


React 事件的命名采用小驼峰式（camelCase），而不是纯小写。

使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

例如，传统的 HTML：


```js

<button onclick="activateLasers()">

  Activate Lasers

</button>


<button onClick={activateLasers}>  

   Activate Lasers

</button>
```

在 React 中略微不同,下面代码是js。

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式地使用 preventDefault。例如，传统的 HTML 中阻止表单的默认提交行为，你可以这样写：

```js

<form onsubmit="console.log('You clicked submit.'); return false">

  <button type="submit">Submit</button>

</form>
```

在 React 中，可能是这样的：
```js

function Form() {

   function handleSubmit(e) {

   e.preventDefault();  

   console.log('You clicked submit.');

   }


   return (

   <form onSubmit={handleSubmit}>

   <button type="submit">Submit</button>

   </form>

   );

}

```

在这里，e 是一个合成事件。React 根据 W3C 规范来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。React 事件与原生事件不完全相同。如果想了解更多，请查看 SyntheticEvent 参考指南。

使用 React 时，你一般不需要使用 addEventListener 为已创建的 DOM 元素添加监听器。事实上，你只需要在该元素初始渲染的时候添加监听器即可。


2.类式组件绑定事件

当你使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。例如，下面的 Toggle 组件会渲染一个让用户切换开关状态的按钮：


```js
class Toggle extends React.Component {
    
    constructor(props) {
    
        super(props);
        
        this.state = {isToggleOn: true};
    
        // 为了在回调中使用 `this`，这个绑定是必不可少
        this.handleClick = this.handleClick.bind(this);  
    }
        
    handleClick() {
        
        this.setState(prevState => ({
        
        isToggleOn: !prevState.isToggleOn
        
        }));
    }
    
    render() {
    
    return (
    
        <button onClick={this.handleClick}>
        
        {this.state.isToggleOn ? 'ON' : 'OFF'}
        
        </button>
        
        );

    }

}

```


在 CodePen 上尝试

你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。

这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。

如果觉得使用 bind 很麻烦，这里有两种方式可以解决。你可以使用 public class fields 语法 to correctly bind callbacks:


```js

class LoggingButton extends React.Component {

    // This syntax ensures `this` is bound within handleClick.
    
    handleClick = () => {
    
    console.log('this is:', this);
    
    };
    
    render() {
    
        return (
        
        <button onClick={this.handleClick}>Click me</button>
        
        );
    }

}

```

Create React App 默认启用此语法。

如果你没有使用 class fields 语法，你可以在回调中使用箭头函数：


```js

class LoggingButton extends React.Component {

    handleClick() {
    
    console.log('this is:', this);
    
    }


    render() {
    
        // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    
        return (
        
        <button onClick={() => this.handleClick()}>Click me</button>
        );
        
    }

}

```

此语法问题在于每次渲染 LoggingButton 时都会创建不同的回调函数。在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。我们通常建议在构造器中绑定或使用 class fields 语法来避免这类性能问题。


3.向事件处理程序传递参数

在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：


`<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>`

`<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`

上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。

在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。


4.收集表单数据

首先我们先来创建一个简单的表单组件：

```html

import React from react;


const MyForm = () => {

    return (
    
    
    <form>
    
        <div>
        用户名 <input type="text"/>
        </div>
    
        <div>
        密码 <input type="password"/>
        </div>
    
        <div>
        电子邮件 <input type="email"/>
        </div>
        
        <div>
            <button>提交</button>
        </div>
    
    </form>
    
    );

};
export default MyForm;
```


首先使用React定义表单和之前传统网页中的表单有一些区别，传统网页中form需要指定action和method两个属性，而表单项也必须要指定name属性，这些属性都是提交表单所必须的。但是在React中定义表单时，这些属性通通都可以不指定，因为React中的表单所有的功能都需要通过代码来控制，包括获取表单值和提交表单，所以这些东西都可以在函数中指定并通过AJAX发送请求，无需直接在表单中设置。


首先我们来研究一下如何获取表单中的用户所填写的内容，要获取用户所填写的内容我们必须要监听表单onChange事件，在表单项发生变化时获取其中的内容，在响应函数中通过事件对象的target.value来获取用户填写的内容。事件响应函数大概是这个样子：


```html

const [inputName, setInputName] = useState('');

const nameChangeHandler = e => {

    //e.target.value 表示当前用户输入的值
    
    setInputName(e.target.value);

};

<div>
    用户名 <input type="text" onChange={nameChangeHandler}/>
</div>

```

这样一来当用户输入内容时，nameChangeHandler就会被触发，从而通过e.target.value来获取用户输入的值。通常我们还会为表单项创建一个state用来存储值：


```js

const [inputName, setInputName] = useState('');

const nameChangeHandler = e => {

    //e.target.value 表示当前用户输入的值
    
    setInputName(e.target.value);

};

```
上例中用户名存储到了变量inputName中，inputName也会设置为对应表单项的value属性值，这样一来当inputName发生变化时，表单项中的内容也会随之改变：
```js
<div>
    用户名 <input type="text" onChange={nameChangeHandler} value={inputName}/>
</div>
```
如此设置后，当用户输入内容后会触发onChange事件从而调用nameChangeHandler函数，在函数内部调用了setInputName设置了用户输入的用户名。换句话说用户在表单中输入内容会影响到state的值，同时当我们修改state的值时，由于表单项的value属性值指向了state，表单也会随state值一起改变。这种绑定方式我们称为双向绑定，即表单会改变state，state也可以改变表单，在开发中使用双向绑定的表单项是最佳实践。

5.受控和非受控组件

先来说说受控组件：

使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

```html

saveName = (event) =>{
    this.setState({name:event.target.value});
}
savePwd = (event) => {
    this.setState({pwd:event.target.value});
}

render() {

    return (
        <form action="http://www.baidu.com" onSubmit={this.login}>
        
        用户名：<input value={this.state.name} onChange={this.saveName} type = "text" />
        
        密码<input value={this.state.pwd} onChange={this.savePwd} type = "password"/>
        
        <button>登录</button>
        
        </form>
    )
}
```
由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。由于 onchange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动,用户的每一次输入都被维护在状态中，获取结果从状态中获取。

非受控组件：

非受控组件其实就是表单元素的值不会更新state。输入数据都是现用现取的。

如下：下面并没有使用state来控制属性，使用的是事件来控制表单的属性值。

表单提交同样需要通过事件来处理，提交表单的事件通过form标签的onSubmit事件来绑定，处理表单的方式因情况而已，但是一定要注意，必须要取消默认行为，否则会触发表单的默认提交行为：

```js

class Login extends React.Component{
    
    login = (event) =>{
        event.preventDefault(); //阻止表单默认事件
        console.log(this.name.value);
        console.log(this.pwd.value);
    }

render() {
    return (
        <form action="http://www.baidu.com" onSubmit={this.login}>
            用户名：<input ref = {e => this.name =e } type = "text" name ="username"/>
            密码：  <input ref = {e => this.pwd =e } type = "password" name ="password"/>
            <button>登录</button>
        </form>
        )
    }
}

```

5.函数的柯里化

- 高级函数 
  - 如果函数的参数是函数 
  - 如果函数返回一个函数 
  - 通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

如下，我们将上面的案例简化，创建高级函数：

```js

class Login extends React.Component{

    state = {name:"",pwd:""};


//返回一个函数

    saveType = (type) =>{
        return (event) => {
            this.setState({[type]:event.target.value});
        }
    }
    
    //因为事件中必须是一个函数，所以返回的也是一个函数，这样就符合规范了
    render() {
        return (
            <form>
                <input onChange = {this.saveType('name')} type = "text"/>
                <button>登录</button>
            </form>
        )
    }

}
ReactDOM.render(<Login />,document.getElementById("div"));

```

不使用函数柯里化

```js

class Login extends React.Component{

    state = {name:"",pwd:""};
    
    //返回一个函数
    saveType = (type,event) =>{
        this.setState({[type]:event.target.value});
    }


//因为事件中必须是一个函数，所以返回的也是一个函数，这样就符合规范了

    render() {
        return (
            <form>
                <input onChange = {event => this.saveType('name',event)} type = "text"/>
                <button>登录</button>
            </form>
        )
    }
}

ReactDOM.render(<Login />,document.getElementById("div"));

```
