import { Card, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import DOMPurify from 'dompurify';

const HtmlDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [title, setTitle] = useState<string>('加载中...');
  const [loading, setLoading] = useState<boolean>(true);
  const [iframeKey, setIframeKey] = useState<number>(0); // 用于强制刷新iframe

  // 假数据（同上）
    // 假数据（模拟后端返回）
    const mockData = [
        {
          id: 1,
          title: "我的简历",
          content: `
 <!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>王帅宇 - Java后端开发作品集</title>
  <!-- Tailwind CSS 3.0+ CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        integrity="sha512-dC0Mnvb+KfELXb8Gz0GXyR9n0I+6QaFkZ9iOb0Kl7oXbV+TZ+8DltvC3JbprVf1a+EzF5ZJbU4iQ84+5dJfP8g==" 
        crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- 深色/浅色模式切换脚本 -->
  <script>
    // 根据系统设置和本地存储切换主题
    if (localStorage.theme === 'dark' || (!("theme" in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    function toggleTheme() {
      if(document.documentElement.classList.contains('dark')){
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }
    }
  </script>
  <style>
    /* 平滑滚动 */
    html {
      scroll-behavior: smooth;
    }
    /* 内容淡入动画 */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out;
    }
  </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  <!-- 头部导航 -->
  <header class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
    <h1 class="text-xl font-bold">王帅宇的作品集</h1>
    <button onclick="toggleTheme()" class="p-2 rounded hover:scale-105 transition-transform" title="切换深色/浅色模式">
      <i class="fas fa-adjust"></i>
    </button>
  </header>

  <!-- 主体内容 -->
  <main class="p-4 space-y-8">
    <!-- 个人简介 -->
    <section id="personal" class="animate-fadeIn">
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">个人简介</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>姓名：</strong>王帅宇</p>
            <p><strong>年龄：</strong>21岁</p>
            <p><strong>联系方式：</strong>18206092717</p>
            <p><strong>邮箱：</strong>2209364580@qq.com</p>
            <p><strong>求职意向：</strong>后端开发</p>
            <p><strong>期望城市：</strong>厦门</p>
          </div>
          <div>
            <p class="mb-2"><strong>个人优势：</strong></p>
            <ul class="list-disc pl-5">
              <li>扎实的 Java 技术栈，熟悉 Spring Cloud 微服务架构，具备高并发场景开发经验</li>
              <li>全流程项目能力，从需求分析、数据库设计到系统优化的完整项目交付经验</li>
              <li>工程化思维，掌握 Docker 容器化部署，熟悉分布式系统设计原理</li>
              <li>复合型人才，具备前端技术（Vue）及 AIGC 应用经验，拥有跨团队协作能力</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 专业技能 -->
    <section id="skills" class="animate-fadeIn">
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">专业技能</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-bold mb-2">架构能力</h3>
            <ul class="list-disc pl-5">
              <li>微服务：Spring Cloud (Nacos/Gateway/OpenFeign) | 分布式事务 (Seata/TCC) | 服务治理</li>
              <li>高并发：Redisson 分布式锁 | MQ 削峰填谷 | 线程池优化 | 分库分表方案</li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold mb-2">后端开发</h3>
            <ul class="list-disc pl-5">
              <li>核心框架：Spring Boot / Spring MVC / MyBatis | JUC 并发编程 | 设计模式</li>
              <li>数据库：MySQL 索引优化 | Redis 缓存设计 | SQL 性能调优 | 分表方案实施</li>
            </ul>
          </div>
          <div class="md:col-span-2">
            <h3 class="font-bold mb-2">DevOps &amp; 前沿技术</h3>
            <ul class="list-disc pl-5">
              <li>容器化：Docker 镜像构建 | 容器编排基础</li>
              <li>监控体系：SkyWalking 全链路追踪 | Prometheus + Granfana 监控</li>
              <li>AIGC 应用：Prompt 工程 | 大模型数据压缩技术 | 异步任务处理方案</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 教育经历 -->
    <section id="education" class="animate-fadeIn">
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">教育经历</h2>
        <p><strong>学校：</strong>厦门理工学院</p>
        <p><strong>专业：</strong>软件工程 (本科 2021-2025)</p>
        <ul class="list-disc pl-5 mt-2">
          <li>连续三年获校级三等奖学金（前25%）</li>
          <li>核心课程：数据结构、算法设计、Java EE、软件工程、项目管理等</li>
          <li>专业认证：软件设计师（中级）职业资格证书（2024年5月）</li>
          <li>竞赛荣誉：蓝桥杯省三等奖 | 国贸精英赛程序设计二等奖</li>
        </ul>
      </div>
    </section>

    <!-- 工作经历 -->
    <section id="experience" class="animate-fadeIn">
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">工作经历</h2>
        <div class="space-y-4">
          <div class="p-4 border rounded hover:shadow-lg transition-shadow">
            <h3 class="font-bold">亚信科技（中国）有限公司 - Java后端开发实习生</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">2024.07 - 2025.03</p>
            <ul class="list-disc pl-5 mt-2">
              <li>主导 3 个核心业务模块开发，完成 20+ 接口设计与测试、接口优化和功能拓展</li>
              <li>输出设计文档、流程引擎迁移和数据割接，数据准确率达 99.9%</li>
              <li>通过 SQL 优化使查询性能提升 40%，参与分布式事务方案设计</li>
              <li>处理 10+ 生产系统缺陷，与团队协作解决复杂问题</li>
              <li>参与 8+ 次代码评审，确保代码质量达标</li>
            </ul>
          </div>
          <div class="p-4 border rounded hover:shadow-lg transition-shadow">
            <h3 class="font-bold">京喜商城 - Spring Cloud 微服务电商平台</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">2024.02 - 2024.05</p>
            <ul class="list-disc pl-5 mt-2">
              <li>设计二级缓存架构（Caffeine + Redis），QPS 提升至 3000+</li>
              <li>采用 Seata AT 模式，实现跨服务订单创建事务一致性</li>
              <li>通过 Gateway 实现 JWT 鉴权、流量控制（50 req/s）</li>
              <li>使用 Docker + Jenkins 实现自动化部署，发布效率提升 70%</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目经验 -->
    <section id="projects" class="animate-fadeIn">
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-2xl font-semibold mb-4">项目经验</h2>
        <div class="space-y-4">
          <div class="p-4 border rounded hover:shadow-lg transition-shadow">
            <h3 class="font-bold">商品服务优化</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">技术栈：Nacos, Gateway, OpenFeign, MySQL, Redis, Docker</p>
            <ul class="list-disc pl-5 mt-2">
              <li>设计二级缓存架构（Caffeine + Redis），QPS 提升至 3000+</li>
              <li>采用 Seata AT 模式，实现跨服务订单创建事务一致性</li>
            </ul>
          </div>
          <div class="p-4 border rounded hover:shadow-lg transition-shadow">
            <h3 class="font-bold">AI 数据分析平台</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">技术栈：RabbitMQ, Redisson, EasyExcel, 线程池, Prompt 工程</p>
            <ul class="list-disc pl-5 mt-2">
              <li>设计 Prompt 模板引擎，将请求响应时间从 15s 降至 8s</li>
              <li>通过 CSV 转换和列裁剪，实现数据压缩，单次处理数据量提升 20%</li>
              <li>使用 Redisson RateLimiter 实现用户级限流（5 req/min）</li>
              <li>自定义线程池（IO 密集型，corePoolSize = CPU * 2），提升吞吐量 300%</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- 底部作者信息 -->
  <footer class="bg-white dark:bg-gray-800 p-4 mt-8 shadow">
    <div class="max-w-4xl mx-auto text-center">
      <p>作者姓名: [作者姓名]</p>
      <p>社交媒体: <a href="https://twitter.com/yourusername" class="text-blue-500 hover:underline" target="_blank">Twitter/X</a></p>
      <p>© <span id="year"></span> 版权所有</p>
    </div>
  </footer>

  <!-- 设置当前年份 -->
  <script>
    document.getElementById('year').textContent = new Date().getFullYear();
  </script>
</body>
</html>

          `,
        },
        {
          id: 2,
          title: "数据可视化示例",
          content: `
            <h2>数据可视化示例</h2>
            <p>这里展示了一些数据可视化内容。</p>
            <div style="width: 100%; height: 300px; background: lightblue; text-align: center;">
              图表占位符
            </div>
          `,
        },
        {
          id: 3,
          title: "可视化分析框架 - 研究成果展示",
          content: `
            <!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AVA 可视化分析框架 - 研究成果展示</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
            animation: fadeIn 0.6s ease-out forwards;
        }
        .dark .architecture-diagram {
            filter: invert(1) hue-rotate(180deg);
        }
    </style>
</head>
<body class="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- 导航栏 -->
    <nav class="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    <i class="fas fa-chart-line text-blue-500 mr-2"></i>AVA 框架
                </h1>
                <button id="theme-toggle" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <i class="fas fa-sun text-gray-700 dark:text-gray-300"></i>
                </button>
            </div>
        </div>
    </nav>

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- 摘要卡片 -->
        <section class="animate-fadein mb-16">
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">核心创新</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <i class="fas fa-brain text-blue-500 text-xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">双引擎推荐系统</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                            结合经验驱动与洞察驱动的混合推荐算法，在保证可视化质量的同时实现深度数据洞察
                        </p>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <i class="fas fa-code text-green-500 text-xl"></i>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">工业级框架</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                            模块化设计支持快速集成，已在蚂蚁集团商业智能平台成功落地应用
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 架构流程图 -->
        <section class="animate-fadein mb-16">
            <h2 class="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">系统架构</h2>
            <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-xl">
                <img src="https://via.placeholder.com/1200x600" alt="AVA 架构图" 
                     class="architecture-diagram rounded-lg w-full h-auto shadow-lg">
            </div>
        </section>

        <!-- 案例研究 -->
        <section class="animate-fadein grid md:grid-cols-2 gap-8 mb-16">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex items-center mb-4">
                    <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-chart-bar text-purple-500"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">经验驱动推荐</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                    基于规则引擎的自动图表生成，支持13种核心规则集，覆盖90%的常见业务场景
                </p>
                <div class="flex space-x-2">
                    <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">自动优化</span>
                    <span class="px-3 py-1 bg-green-100 dark:green-900 text-green-600 dark:text-green-300 rounded-full text-sm">实时反馈</span>
                </div>
            </div>

            <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div class="flex items-center mb-4">
                    <div class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-lightbulb text-orange-500"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">洞察驱动分析</h3>
                </div>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                    基于蒙特卡洛树搜索的智能洞察发现，支持趋势分析、异常检测等8种核心洞察类型
                </p>
                <div class="flex space-x-2">
                    <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm">智能筛选</span>
                    <span class="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full text-sm">动态解释</span>
                </div>
            </div>
        </section>

        <!-- 性能对比 -->
        <section class="animate-fadein">
            <h2 class="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">性能对比</h2>
            <div class="overflow-x-auto rounded-xl shadow-lg">
                <table class="w-full bg-white dark:bg-gray-800">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">框架</th>
                            <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">推荐准确性</th>
                            <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">响应时间</th>
                            <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">扩展性</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                            <td class="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">AVA</td>
                            <td class="px-6 py-4 text-center text-sm text-green-600">92%</td>
                            <td class="px-6 py-4 text-center text-sm text-blue-600"><300ms</td>
                            <td class="px-6 py-4 text-center text-sm text-purple-600">高</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">传统方案</td>
                            <td class="px-6 py-4 text-center text-sm text-gray-600">65-75%</td>
                            <td class="px-6 py-4 text-center text-sm text-gray-600">1-2s</td>
                            <td class="px-6 py-4 text-center text-sm text-gray-600">中</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <!-- 作者信息 -->
    <footer class="bg-gray-100 dark:bg-gray-800 mt-24">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div class="mb-4 md:mb-0">
                        <h3 class="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">作者信息</h3>
                        <p class="text-gray-600 dark:text-gray-400">王佳哲 博士团队</p>
                        <div class="mt-2">
                            <a href="https://twitter.com/antvis" 
                               class="text-blue-500 hover:text-blue-600 transition-colors">
                                <i class="fab fa-twitter mr-2"></i>@antvis
                            </a>
                        </div>
                    </div>
                    <div class="text-gray-500 dark:text-gray-400 text-sm">
                        <p>© 2024 浙江大学 CAD&CG 国家重点实验室</p>
                        <p class="mt-1">基于 CC BY-NC-ND 4.0 协议</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // 深色模式切换
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            themeIcon.className = isDark ? 'fas fa-moon text-gray-300' : 'fas fa-sun text-gray-700';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        themeToggle.addEventListener('click', toggleTheme);

        // 初始化主题
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (savedTheme === 'dark') document.documentElement.classList.add('dark');
        
        // 滚动动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadein');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => observer.observe(section));
    </script>
</body>
</html>
          `,
        },
        {
          id: 4,
          title: "深度学习研究",
          content: `
            <h2>深度学习研究</h2>
            <p>关于深度学习的最新研究进展。</p>
          `,
        },
      ];

  useEffect(() => {
    setLoading(true);
    
    const page = mockData.find(item => item.id === Number(id));
    if (page) {
      setTitle(page.title);
      // 净化HTML并注入必要元标签
      const sanitizedContent = DOMPurify.sanitize(page.content, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
        FORCE_BODY: true // 确保完整文档结构
      });
      
      // 补全文档声明和视口设置
      const fullHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${loadExternalResources()}
          </head>
          <body class="ant-pro-body">${sanitizedContent}</body>
        </html>
      `;
      
      setHtmlContent(page.content);
      setIframeKey(prev => prev + 1); // 强制重建iframe
    }
    
    setLoading(false);
  }, [id]);

  // 动态加载外部资源
  const loadExternalResources = () => {
    return `
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" 
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    `;
  };

  return (
    <Card title={title} loading={loading}>
      <iframe
        key={iframeKey}
        srcDoc={htmlContent}
        style={{ 
          width: '100%',
          border: 'none',
          minHeight: '100vh',
          backgroundColor: 'transparent' 
        }}
        sandbox="allow-scripts allow-same-origin" // 安全沙箱配置
        onLoad={(e) => {
          // 动态调整iframe高度（网页1方案改进）
          const iframe = e.target as HTMLIFrameElement;
          try {
            const doc = iframe.contentDocument?.documentElement;
            if (doc) {
              iframe.style.height = `${doc.scrollHeight}px`;
            }
          } catch (error) {
            console.warn('跨域安全限制:', error);
          }
        }}
      />
    </Card>
  );
};

export default HtmlDetailPage;