# CSS: 从 `float` 到高度塌陷再到解决方法

## 1. 什么是 `float`？

`float` 是 CSS 的一种布局属性，用于让元素脱离正常文档流，并按照指定方向移动到容器的一侧。

### **常见值**：
| **值**         | **描述**                                            |
|----------------|----------------------------------------------------|
| `none`        | 默认值。元素不浮动，保持在正常文档流中。             |
| `left`        | 元素浮动到父容器的左侧。                            |
| `right`       | 元素浮动到父容器的右侧。                            |
| `inherit`     | 继承父元素的浮动属性。                              |

### **浮动的特点**：
1. **脱离正常文档流**：浮动的元素会从正常文档流中移除，其他非浮动元素会重新排列。
2. **占据父容器的一侧**：浮动元素会紧贴父容器的左边或右边。

### **浮动的简单示例**：
```html
<div class="container">
    <div class="float-box">浮动元素</div>
    <p>这是普通段落内容。</p>
</div>
```
```css
.container {
    width: 300px;
    border: 1px solid black;
}

.float-box {
    float: left;
    width: 100px;
    height: 50px;
    background-color: lightblue;
}
```

#### **效果**：
- `float-box` 浮动到容器的左侧。
- 普通段落内容会绕过浮动元素，重新排列。

```
+----------------------------+
| 浮动元素                  |
|                            |
| 这是普通段落内容。         |
+----------------------------+
```

---

## 2. 什么是高度塌陷？

当一个**容器中的所有子元素都设置为浮动**时，由于这些子元素脱离了正常文档流，父容器会认为它们“**不存在**”。因此，父容器的高度会变成 `0`，导致视觉上父容器无法包裹住子元素。

### **案例：浮动导致高度塌陷**
```html
<div class="container">
    <div class="float-box">浮动1</div>
    <div class="float-box">浮动2</div>
</div>
```
```css
.container {
    width: 300px;
    border: 1px solid red;
}

.float-box {
    float: left;
    width: 100px;
    height: 50px;
    background-color: lightblue;
    margin-right: 10px;
}
```

#### **问题描述**：
- 两个 `float-box` 元素浮动到左侧。
- 父容器 `.container` 的高度塌陷为 `0`，因为浮动的子元素被移出正常文档流。
- 父容器边框仅显示为一条水平线。

```
+----------------------------+
| (看不到容器的高度)         |
| 浮动1 浮动2               |
```

---

## 3. 如何解决高度塌陷？

### **方法 1：使用 `overflow: hidden`**
在父容器上添加 `overflow: hidden`，这会触发 **BFC（块格式化上下文）**，从而让父容器包裹住浮动的子元素。

#### **代码示例**：
```css
.container {
    border: 1px solid red;
    width: 300px;
    overflow: hidden; /* 清除浮动 */
}
```

#### **效果**：
父容器会重新计算高度，完全包裹浮动的子元素：
```
+----------------------------+
| 浮动1 浮动2               |
+----------------------------+
```

### **方法 2：使用伪元素清除浮动**
通过在父容器内添加一个伪元素，清除浮动效果。

#### **代码示例**：
```css
.container {
    border: 1px solid red;
    width: 300px;
}

.container::after {
    content: "";
    display: block;
    clear: both; /* 清除浮动 */
}

.float-box {
    float: left;
    width: 100px;
    height: 50px;
    background-color: lightblue;
    margin-right: 10px;
}
```

#### **效果**：
与 `overflow: hidden` 相同，父容器会重新包裹浮动的子元素。

---

## 4. 总结

### **浮动的核心问题**：
- 浮动元素会脱离正常文档流，导致父容器无法自动计算高度。
- 如果父容器中所有子元素都浮动，容器高度会塌陷。

### **解决高度塌陷的方法**：
1. **`overflow: hidden`**：
   - 最简单的解决方案，通过触发 BFC 包裹浮动子元素。
   - 缺点：如果内容需要滚动，会隐藏溢出的部分。

2. **伪元素清除浮动**：
   - 添加 `::after` 伪元素并使用 `clear: both;`。
   - 更灵活，适合复杂布局。

---

### **代码模板**：
```html
<div class="container">
    <div class="float-box">浮动1</div>
    <div class="float-box">浮动2</div>
</div>
```
```css
.container {
    border: 1px solid red;
    width: 300px;
    overflow: hidden; /* 或使用伪元素清除浮动 */
}

/* 清除浮动的伪元素 */
.container::after {
    content: "";
    display: block;
    clear: both;
}

.float-box {
    float: left;
    width: 100px;
    height: 50px;
    background-color: lightblue;
    margin-right: 10px;
}
```

通过掌握浮动、高度塌陷及其解决方法，你可以更好地控制页面布局，避免布局问题。
