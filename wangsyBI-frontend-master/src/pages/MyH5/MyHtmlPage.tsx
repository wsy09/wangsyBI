import { useModel, history } from '@@/exports';
import { Avatar, Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import Search from "antd/es/input/Search";

/**
 * HTML 页面列表 (假数据版)
 */
const MyHtmlPage: React.FC = () => {
  const initSearchParams = {
    current: 1,
    pageSize: 4,
    sortOrder: 'desc',
    title: '',
  };

  const [searchParams, setSearchParams] = useState(initSearchParams);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [htmlList, setHtmlList] = useState<{ id: number; title: string; description: string }[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // 假数据
  const mockData = [
    { id: 1, title: "我的简历", description: "关于我的简历的个人主页。" },
    { id: 2, title: "数据可视化示例", description: "包含 ECharts 数据可视化的 HTML 页面。" },
    { id: 3, title: "机器学习报告", description: "使用 AI 生成的机器学习分析报告。" },
    { id: 4, title: "深度学习研究", description: "AI 生成的深度学习技术解析。" },
  ];

  // 加载数据（模拟异步请求）
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let filteredData = mockData.filter(item => item.title.includes(searchParams.title));
      setHtmlList(filteredData.slice((searchParams.current - 1) * searchParams.pageSize, searchParams.current * searchParams.pageSize));
      setTotal(filteredData.length);
      setLoading(false);
    }, 500);
  }, [searchParams]);

  return (
    <div className="my-html-page">
      {/* 搜索框 */}
      <div>
        <Search 
          placeholder="请输入页面标题" 
          enterButton 
          loading={loading} 
          onSearch={(value) => setSearchParams({ ...initSearchParams, title: value })}
        />
      </div>
      <div className="margin-16" />
      
      {/* HTML 页面列表 */}
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
        pagination={{
          onChange: (page, pageSize) => setSearchParams({ ...searchParams, current: page, pageSize }),
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={htmlList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card 
              style={{ width: '100%', cursor: 'pointer' }} 
              hoverable
              onClick={() => history.push(`/my_h5/${item.id}`)} // 确保路径正确
            >
              <List.Item.Meta
                avatar={<Avatar src={currentUser?.userAvatar} />}
                title={item.title}
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MyHtmlPage;
