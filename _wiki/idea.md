---
layout: wiki
title: IDEA 十大快捷键
categories: Tools
description: IDEA 十大快捷键。
keywords: IDEA
---
# 十大快捷键

Intellij IDEA中有很多快捷键让人爱不释手，stackoverflow上也有一些[有趣的讨论](http://stackoverflow.com/questions/294167/what-are-the-most-useful-intellij-idea-keyboard-shortcuts)。每个人都有自己的最爱，想排出个理想的榜单还真是困难。以前也整理过[Intellij的快捷键](http://blog.csdn.net/dc_726/article/details/9531281)，这次就按照我日常开发时的使用频率，简单分类列一下我最喜欢的**十大快捷-神-键**吧。

## 1 智能提示

Intellij首当其冲的当然就是Intelligence智能！基本的代码提示用**Ctrl+Space**， 还有更智能地按类型信息提示**Ctrl+Shift+Space**，但因为Intellij总是随着我们敲击而自动提示，所以很多时候都不会手动敲这两个快捷键(除非提示框消失了)。用**F2/ Shift+F2**移动到有错误的代码，**Alt+Enter**快速修复(即Eclipse中的Quick Fix功能)。当智能提示为我们自动补全方法名时，我们通常要自己补上行尾的反括号和分号，当括号嵌套很多层时会很麻烦，这时我们只需敲**Ctrl+Shift+Enter**就能自动补全末尾的字符。而且不只是括号，例如敲完if/for时也可以自动补上{}花括号。

最后要说一点，Intellij能够智能感知[spring](http://lib.csdn.net/base/javaee "Java EE知识库")、[hibernate](http://lib.csdn.net/base/javaee "Java EE知识库")等主流框架的配置文件和类，以静制动，在看似“静态”的外表下，智能地扫描理解你的项目是如何构造和配置的。

## 2 重构

Intellij重构是另一完爆Eclipse的功能，其智能程度令人瞠目结舌，比如提取变量时自动检查到所有匹配同时提取成一个变量等。尤其看过**《重构-改善既有代码设计》**之后，有了Intellij的配合简直是令人大呼过瘾！也正是强大的智能和重构功能，使Intellij下的TDD开发非常顺畅。

切入正题，先说一个无敌的重构功能大汇总快捷键**Ctrl+Shift+Alt+T**，叫做Refactor This。按法有点复杂，但也符合Intellij的风格，很多快捷键都要双手完成，而不像Eclipse不少最有用的快捷键可以潇洒地单手完成(不知道算不算Eclipse的一大优点)，但各位用过**Emacs**的话就会觉得也没什么了(非Emacs黑)。此外，还有些最常用的重构技巧，因为太常用了，若每次都在Refactor This菜单里选的话效率有些低。比如**Shift+F6**直接就是改名，**Ctrl+Alt+V**则是提取变量。

## 3 代码生成

这一点类似Eclipse，虽不是独到之处，但因为日常使用频率极高，所以还是罗列在榜单前面。常用的有**fori/sout/psvm+Tab**即可生成循环、System.out、main方法等boilerplate样板代码，用**Ctrl+J**可以查看所有模板。后面“辅助”一节中将会讲到**Alt+Insert**，在编辑窗口中点击可以生成构造函数、toString、getter/setter、重写父类方法等。这两个技巧实在太常用了，几乎每天都要生成一堆main、System.out和getter/setter。

另外，Intellij IDEA 13中加入了后缀自动补全功能(**Postfix Completion**)，比模板生成更加灵活和强大。例如要输入for(User user : users)只需输入user**.for+Tab**。再比如，要输入Date birthday = user.getBirthday();只需输入user.getBirthday()**.var+Tab**即可。

## 4 编辑

编辑中不得不说的一大神键就是能够自动按语法选中代码的**Ctrl+W**以及反向的**Ctrl+Shift+W**了。此外，**Ctrl+Left/Right**移动光标到前/后单词，**Ctrl+[/]**移动到前/后代码块，这些**类Vim风格的光标移动**也是一大亮点。以上Ctrl+Left/Right/[]加上Shift的话就能选中跳跃范围内的代码。**Alt+Forward/Backward**移动到前/后方法。还有些非常普通的像**Ctrl+Y**删除行、**Ctrl+D**复制行、**Ctrl+**折叠代码就不多说了。

关于光标移动再多扩展一点，除了Intellij本身已提供的功能外，我们还可以安装**ideaVim或者emacsIDEAs享受到Vim的快速移动和Emacs的AceJump功能**(超爽！)。另外，Intellij的书签功能也是不错的，用**Ctrl+Shift+Num**定义1-10书签(再次按这组快捷键则是删除书签)，然后通过**Ctrl+Num**跳转。这避免了多次使用前/下一编辑位置**Ctrl+Left/Right**来回跳转的麻烦，而且此快捷键默认与Windows热键冲突(默认多了Alt，与Windows改变显示器显示方向冲突，一不小心显示器就变成倒着显式的了，冏啊)。

## 5 查找打开

类似Eclipse，Intellij的**Ctrl+N/Ctrl+Shift+N**可以打开类或资源，但Intellij更加智能一些，我们输入的任何字符都将看作模糊匹配，省却了Eclipse中还有输入*的麻烦。最新版本的IDEA还加入了Search Everywhere功能，只需按**Shift+Shift**即可在一个弹出框中搜索任何东西，包括类、资源、配置项、方法等等。

类的继承关系则可用**Ctrl+H**打开类层次窗口，在继承层次上跳转则用**Ctrl+B/Ctrl+Alt+B**分别对应父类或父方法定义和子类或子方法实现，查看当前类的所有方法用**Ctrl+F12**。

要找类或方法的使用也很简单，**Alt+F7**。要查找文本的出现位置就用**Ctrl+F/Ctrl+Shift+F**在当前窗口或全工程中查找，再配合**F3/Shift+F3**前后移动到下一匹配处。

Intellij更加智能的又一佐证是在任意菜单或显示窗口，都可以直接输入你要找的单词，Intellij就会自动为你过滤。

## 6 其他辅助

以上这些神键配上一些辅助快捷键，即可让你的双手90%以上的时间摆脱鼠标，专注于键盘仿佛在进行钢琴表演。这些不起眼却是至关重要的最后一块拼图有：

Ø  **命令**：**Ctrl+Shift+A**可以查找所有Intellij的命令，并且每个命令后面还有其快捷键。所以它不仅是一大神键，也是查找学习快捷键的工具。

Ø  **新建**：**Alt+Insert**可以新建类、方法等任何东西。

Ø  **格式化代码**：格式化import列表**Ctrl+Alt+O**，格式化代码**Ctrl+Alt+L**。

Ø  **切换窗口**：**Alt+Num**，常用的有1-项目结构，3-搜索结果，4/5-运行调试。**Ctrl+Tab**切换标签页，**Ctrl+E/Ctrl+Shift+E**打开最近打开过的或编辑过的文件。

Ø  **单元[测试](http://lib.csdn.net/base/softwaretest "软件测试知识库")**：**Ctrl+Alt+T**创建单元测试用例。

Ø  **运行**：**Alt+Shift+F10**运行程序，**Shift+F9**启动调试，**Ctrl+F2**停止。

Ø  **调试**：**F7/F8/F9**分别对应Step into，Step over，Continue。

此外还有些我自定义的，例如水平分屏**Ctrl+\|** 等，和一些神奇的小功能**Ctrl+Shift+V** 粘贴很早以前拷贝过的，**Alt+Shift+Insert** 进入到列模式进行按列选中。

## 7 最终榜单

这榜单阵容太豪华了，后几名都是如此有用，毫不示弱。

Ø  **Top #10切来切去**：Ctrl+Tab

Ø  **Top #9选你所想**：Ctrl+W

Ø  **Top #8代码生成**：Template/Postfix +Tab

Ø  **Top #7发号施令**：Ctrl+Shift+A

Ø  **Top #6无处藏身**：Shift+Shift

Ø  **Top #5自动完成**：Ctrl+Shift+Enter

Ø  **Top #4创造万物**：Alt+Insert

太难割舍，前三名并列吧！

Ø  **Top #1智能补全**：Ctrl+Shift+Space

Ø  **Top #1自我修复**：Alt+Enter

Ø  **Top #1重构一切**：Ctrl+Shift+Alt+T

转：[西代零零发](http://blog.csdn.net/dc_726/article/details/42784275)



# 总结

## 常规
- Ctrl+Shift + Enter，语句完成
- “！”，否定完成，输入表达式时按 “！”键
- Ctrl+E，最近的文件
- Ctrl+Shift+E，最近更改的文件
- Shift+Click，可以关闭文件
- Ctrl+[ OR ]，可以跑到大括号的开头与结尾
- Ctrl+F12，可以显示当前文件的结构
- Ctrl+F7，可以查询当前元素在当前文件中的引用，然后按 F3 可以选择
- Ctrl+N，可以快速打开类
- Ctrl+Shift+N，可以快速打开文件
- Alt+Q，可以看到当前方法的声明
- Ctrl+P，可以显示参数信息
- Ctrl+Shift+Insert，可以选择剪贴板内容并插入
- Alt+Insert，可以生成构造器/Getter/Setter等
- Ctrl+Alt+V，可以引入变量。例如：new String();  自动导入变量定义
- Ctrl+Alt+T，可以把代码包在一个块内，例如：try/catch
- Ctrl+Enter，导入包，自动修正
- Ctrl+Alt+L，格式化代码
- Ctrl+Alt+I，将选中的代码进行自动缩进编排，这个功能在编辑 JSP 文件时也可以工作
- Ctrl+Alt+O，优化导入的类和包
- Ctrl+R，替换文本
- Ctrl+F，查找文本
- Ctrl+Shift+Space，自动补全代码
- Ctrl+空格，代码提示（与系统输入法快捷键冲突）
- Ctrl+Shift+Alt+N，查找类中的方法或变量
- Alt+Shift+C，最近的更改
- Alt+Shift+Up/Down，上/下移一行
- Shift+F6，重构 - 重命名
- Ctrl+X，删除行
- Ctrl+D，复制行
- Ctrl+/或Ctrl+Shift+/，注释（//或者/**/）
- Ctrl+J，自动代码（例如：serr）
- Ctrl+Alt+J，用动态模板环绕
- Ctrl+H，显示类结构图（类的继承层次）
- Ctrl+Q，显示注释文档
- Alt+F1，查找代码所在位置
- Alt+1，快速打开或隐藏工程面板
- Ctrl+Alt+left/right，返回至上次浏览的位置
- Alt+left/right，切换代码视图
- Alt+Up/Down，在方法间快速移动定位
- Ctrl+Shift+Up/Down，向上/下移动语句
- F2 或 Shift+F2，高亮错误或警告快速定位
- Tab，代码标签输入完成后，按 Tab，生成代码
- Ctrl+Shift+F7，高亮显示所有该文本，按 Esc 高亮消失
- Alt+F3，逐个往下查找相同文本，并高亮显示
- Ctrl+Up/Down，光标中转到第一行或最后一行下
- Ctrl+B/Ctrl+Click，快速打开光标处的类或方法（跳转到定义处）
- Ctrl+Alt+B，跳转到方法实现处
- Ctrl+Shift+Backspace，跳转到上次编辑的地方
- Ctrl+O，重写方法
- Ctrl+Alt+Space，类名自动完成
- Ctrl+Alt+Up/Down，快速跳转搜索结果
- Ctrl+Shift+J，整合两行
- Alt+F8，计算变量值
- Ctrl+Shift+V，可以将最近使用的剪贴板内容选择插入到文本
- Ctrl+Alt+Shift+V，简单粘贴
- Shift+Esc，不仅可以把焦点移到编辑器上，而且还可以隐藏当前（或最后活动的）工具窗口
- F12，把焦点从编辑器移到最近使用的工具窗口
- Shift+F1，要打开编辑器光标字符处使用的类或者方法 Java 文档的浏览器
- Ctrl+W，可以选择单词继而语句继而行继而函数
- Ctrl+Shift+W，取消选择光标所在词
- Alt+F7，查找整个工程中使用地某一个类、方法或者变量的位置
- Ctrl+I，实现方法
- Ctrl+Shift+U，大小写转化
- Ctrl+Y，删除当前行
- Shift+Enter，向下插入新行
- psvm/sout，main/System.out.println(); Ctrl+J，查看更多
- Ctrl+Shift+F，全局查找
- Ctrl+F，查找/Shift+F3，向上查找/F3，向下查找
- Ctrl+Shift+S，高级搜索
- Ctrl+U，转到父类
- Ctrl+Alt+S，打开设置对话框
- Alt+Shift+Inert，开启/关闭列选择模式
- Ctrl+Alt+Shift+S，打开当前项目/模块属性
- Ctrl+G，定位行
- Alt+Home，跳转到导航栏
- Ctrl+Enter，上插一行
- Ctrl+Backspace，按单词删除
- Ctrl+"+/-"，当前方法展开、折叠
- Ctrl+Shift+"+/-"，全部展开、折叠
## 调试部分、编译
- Ctrl+F2，停止
- Alt+Shift+F9，选择 Debug
- Alt+Shift+F10，选择 Run
- Ctrl+Shift+F9，编译
- Ctrl+Shift+F10，运行
- Ctrl+Shift+F8，查看断点
- F8，步过
- F7，步入
- Shift+F7，智能步入
- Shift+F8，步出
- Alt+Shift+F8，强制步过
- Alt+Shift+F7，强制步入
- Alt+F9，运行至光标处
- Ctrl+Alt+F9，强制运行至光标处
- F9，恢复程序
- Alt+F10，定位到断点
- Ctrl+F8，切换行断点
- Ctrl+F9，生成项目
- Alt+1，项目
- Alt+2，收藏
- Alt+6，TODO
- Alt+7，结构
- Ctrl+Shift+C，复制路径
- Ctrl+Alt+Shift+C，复制引用，必须选择类名
- Ctrl+Alt+Y，同步
- Ctrl+~，快速切换方案（界面外观、代码风格、快捷键映射等菜单）
- Shift+F12，还原默认布局
- Ctrl+Shift+F12，隐藏/恢复所有窗口
- Ctrl+F4，关闭
- Ctrl+Shift+F4，关闭活动选项卡
- Ctrl+Tab，转到下一个拆分器
- Ctrl+Shift+Tab，转到上一个拆分器
## 重构
- Ctrl+Alt+Shift+T，弹出重构菜单
- Shift+F6，重命名
- F6，移动
- F5，复制
- Alt+Delete，安全删除
- Ctrl+Alt+N，内联
## 查找
- Ctrl+F，查找
- Ctrl+R，替换
- F3，查找下一个
- Shift+F3，查找上一个
- Ctrl+Shift+F，在路径中查找
- Ctrl+Shift+R，在路径中替换
- Ctrl+Shift+S，搜索结构
- Ctrl+Shift+M，替换结构
- Alt+F7，查找用法
- Ctrl+Alt+F7，显示用法
- Ctrl+F7，在文件中查找用法
- Ctrl+Shift+F7，在文件中高亮显示用法
## VCS
- Alt+~，VCS 操作菜单
- Ctrl+K，提交更改
- Ctrl+T，更新项目
- Ctrl+Alt+Shift+D，显示变化

