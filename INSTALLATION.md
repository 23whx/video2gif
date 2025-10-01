# 🚀 安装和启动指南

## 重要：安装新依赖

在启动项目之前，需要先安装新添加的语言检测依赖：

```bash
npm install
```

或者单独安装新依赖：

```bash
npm install i18next-browser-languagedetector
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 访问应用

打开浏览器访问：`http://localhost:4321`

## ✨ 新功能

### 多语言支持已完善

- ✅ **默认语言**：英文（English）
- ✅ **智能检测**：自动根据浏览器语言设置
- ✅ **支持语言**：中文、英文、日文
- ✅ **全局统一**：所有页面统一语言状态
- ✅ **实时切换**：语言切换立即生效

### 测试语言功能

1. **清除浏览器数据测试默认语言**：
   ```javascript
   // 在浏览器控制台执行
   localStorage.clear();
   location.reload();
   // 应该显示英文界面
   ```

2. **测试浏览器语言检测**：
   - 打开浏览器设置
   - 修改首选语言为中文或日文
   - 清除 localStorage
   - 刷新页面
   - 应该显示对应语言

3. **测试语言切换**：
   - 点击右上角语言选择器
   - 选择不同语言
   - 所有文本应立即更新

## 📦 新增依赖

- `i18next-browser-languagedetector` - 浏览器语言自动检测

## 🎯 验证安装成功

启动后检查以下几点：

- [ ] 首页默认显示英文
- [ ] 语言选择器在导航栏右上角
- [ ] 可以在中/英/日之间切换
- [ ] 切换后整个页面文本都更新
- [ ] 刷新页面保持选择的语言
- [ ] 没有控制台错误

## 🐛 常见问题

### 问题：npm install 失败

**解决方案**：
```bash
# 清除缓存重试
npm cache clean --force
npm install
```

### 问题：启动报错缺少模块

**解决方案**：
```bash
# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题：页面显示 "Loading..."

**解决方案**：
- 检查浏览器控制台错误
- 确认 i18next 正确安装
- 尝试清除浏览器缓存

## 📝 下一步

安装成功后，查看以下文档了解更多：

- [I18N_UPDATE_GUIDE.md](./I18N_UPDATE_GUIDE.md) - 多语言系统详细说明
- [README.md](./README.md) - 项目总览
- [QUICKSTART.md](./QUICKSTART.md) - 快速开始指南

---

祝您使用愉快！🎉

