# Git的使用日常

## 1、操作流程

![git操作通用流程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/25/162fcc0987bf1c0a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp#?w=1172&h=340&s=18854&e=png&a=1&b=acd8e5)

其中：

+ 工作区(workspace)：本地电脑存放项目的地方

+ 暂存区(index)：在使用git管理项目文件时，本地的项目文件会多出一个.git的文件夹，将这个.git文件夹称之为版本库。
+ 本地仓库(repsitory)：使用commit命令可以将暂存区中的文件添加到本地仓库中
+ 远程仓库(remote)：不是在本地仓库中，项目代码在远程git服务器上，比如项目放在github上，就是一个远程仓库，通常使用clone命令将远程仓库拷贝到本地仓库中，开发后推送到远程仓库中即可

## 2、git配置

**第一次使用git，配置用户信息：**

```
//配置用户名
git config --global user.name "your name"
//配置用户邮箱
git config --global user.email "youremail@github.com"
```

**查询配置信息：**

```
//列出当前配置
git config --list
//列出repository
git config --local --list
//列出全局配置
git config --global --list
//列出系统配置
git config --system --list
```

## 3、 工作区上的操作命令

1. **新建仓库**
   + 将工作区中的项目文件使用git进行管理，即创建一个新的本地仓库：`git init`

2. **提交**

   + 提交工作区所有文件到暂存区：`git add .`

   + 提交工作区中指定文件到暂存区：`git add <file> <file> ..`

   + 提交工作区中某个文件夹中所有文件到暂存区：`git add [dir]`

3. **撤销**
   + 删除工作区文件，并且也从暂存区删除对应文件记录：`git rm <file> <file> `
   + 从暂存区删除文件，但是工作区依然还有该文件：`git rm --cached <file> `
   + 取消暂存区已经暂存的文件：`git reset HEAD <file>`
   + 撤销上一次对文件的操作：`git checkout --<file>`。要确定上一次对文件的修改不再需要
   + 隐藏当前变更，以便能够切换分支：`git stash`
   + 查看当前所有的储藏：`git stash list`；
   + 应用最新的储藏：`git stash apply`，如果想应用更早的储藏：`git stash apply stash@{2}`；重新应用被暂存的变更，需要加上`--index`参数：`git stash apply --index`;
   + 使用apply命令只是应用储藏，而内容仍然还在栈上，需要移除指定的储藏：`git stash drop stash{0}`；如果使用pop命令不仅可以重新应用储藏，还可以立刻从堆栈中清除：`git stash pop`

## 4、分支操作

1. 创建分支并跟踪远程分支

   ~~~
   git checkout -b <branchname> <remote-name>/<branchname>
   ~~~

2. 创建分支：`git branch <branch-name>`

3. 从当前所处的分支切换到其他分支：`git checkout <branch-name>`

4. 新建并切换到新建分支上：`git checkout -b <branch-name>`

5. 删除分支：`git branch -d <branch-name>`

6. 将当前分支与指定分支进行合并：`git merge <branch-name>`

7. 显示本地仓库的所有分支：`git branch`

8. 查看各个分支最后一个提交对象的信息：`git branch -v`

9. 查看哪些分支已经合并到当前分支：`git branch --merged`

10. 将一个分支里提交的改变移到基底分支上重放一遍：`git rebase <rebase-branch> <branch-name>`，如`git rebase master server`，将特性分支server提交的改变在基底分支master上重演一遍；使用rebase操作最大的好处是像在单个分支上操作的，提交的修改历史也是一根线。

   注：rebase操作应该遵循的原则是：**一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行rebase操作**；

## 5、提交文件

1. 将暂存区中的文件提交到本地仓库中，即打上新版本：`git commit -m "commit_info"`
2. 将所有已经使用git管理过的文件暂存后一并提交，跳过add到暂存区的过程：`git commit -a -m "commit_info"`
3. 提交文件时，发现漏掉几个文件，或者注释写错了，可以撤销上一次提交：`git commit --amend`
4. 比较暂存区与上一版本的差异：`git diff --cached`
5. 指定文件在暂存区和本地仓库的不同：`git diff <file-name> --cached`
6. 查看提交历史：git log；参数`-p`展开每次提交的内容差异，用`-2`显示最近的两次更新，如`git log -p -2`
