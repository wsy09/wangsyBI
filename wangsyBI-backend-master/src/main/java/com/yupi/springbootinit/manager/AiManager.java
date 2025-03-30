package com.yupi.springbootinit.manager;

import com.tencentcloudapi.common.AbstractModel;
import com.tencentcloudapi.common.Credential;
import com.tencentcloudapi.common.SSEResponseModel;
import com.tencentcloudapi.common.exception.TencentCloudSDKException;
import com.tencentcloudapi.common.profile.ClientProfile;
import com.tencentcloudapi.common.profile.HttpProfile;
import com.tencentcloudapi.lkeap.v20240522.LkeapClient;
import com.tencentcloudapi.lkeap.v20240522.models.ChatCompletionsRequest;
import com.tencentcloudapi.lkeap.v20240522.models.ChatCompletionsResponse;
import com.tencentcloudapi.lkeap.v20240522.models.Message;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.exception.ThrowUtils;
import com.yupi.yucongming.dev.client.YuCongMingClient;
import com.yupi.yucongming.dev.common.BaseResponse;
import com.yupi.yucongming.dev.model.DevChatRequest;
import com.yupi.yucongming.dev.model.DevChatResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 用于对接 AI 平台
 */
@Service
@Slf4j
public class AiManager {

    @Resource
    private LkeapClient deepseekClient;

    /**
     * AI 对话
     *
     * @param modelId
     * @param message
     * @return
     */
    public String doChat(long modelId, String message) {
        try{
            String prompt = "你是一个数据分析师和前端开发专家，接下来我会按照以下固定格式给你提供内容：\n" +
                "分析需求：\n" +
                "{数据分析的需求或者目标}\n" +
                "原始数据：\n" +
                "{csv格式的原始数据，用,作为分隔符}\n" +
                "请根据这两部分内容，按照以下指定格式生成内容（此外不要输出任何多余的开头、结尾、注释）\n" +
                "【【【【【\n" +
                "{前端 Echarts V5 的 option 配置对象js代码(输出json格式 )，合理地将数据进行可视化，不要生成任何多余的内容，比如注释}\n" +
                "【【【【【\n" +
                "{明确的数据分析结论、越详细越好，不要生成多余的注释}\n" +
                "【【【【【";

            // 实例化一个请求对象,每个接口都会对应一个request对象
            Message[] messages = new Message[2];
            Message message_sys = new Message();
            message_sys.setRole("system");
            message_sys.setContent(prompt);
            messages[0] = message_sys;
            ChatCompletionsRequest req = new ChatCompletionsRequest();
            req.setStream(false);
            Message message1 = new Message();
            message1.setRole("user");
            message1.setContent(message);
            messages[1] = message1;
            req.setModel("deepseek-r1");
            req.setMessages(messages);
            // 返回的resp是一个ChatCompletionsResponse的实例，与请求对象对应
            ChatCompletionsResponse resp = deepseekClient.ChatCompletions(req);
            // 输出json格式的字符串回包
            return resp.getChoices()[0].getMessage().getContent();
        } catch (TencentCloudSDKException e) {
            System.out.println(e.toString());
            log.error("AI 对话失败", e);
           throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
    }
    public String doChatGetHtml(long modelId, String message) {
        try{
            String prompt = "我会给你一个文件，分析内容，并将其转化为美观漂亮的中文可视化网页作品集：\n" +
                    "## 内容要求\n" +
                    "- 保持原文件的核心信息，但以更易读、可视化的方式呈现\n" +
                    "- 在页面底部添加作者信息区域，包含：    \n" +
                    " * 作者姓名: [作者姓名]\n" +
                    " * 社交媒体链接: 至少包含Twitter/X：  \n" +
                    "- 版权信息和年份\n" +
                    "## 设计风格\n" +
                    "- 整体风格参考Linear App的简约现代设计\n" +
                    "- 使用清晰的视觉层次结构，突出重要内容\n" +
                    "- 配色方案应专业、和谐，适合长时间阅读\n" +
                    "## 技术规范\n" +
                    "- 使用HTML5、TailwindCSS 3.0+（通过CDN引入）和必要的JavaScript\n" +
                    "- 实现完整的深色/浅色模式切换功能，默认跟随系统设置\n" +
                    "- 代码结构清晰，包含适当注释，便于理解和维护\n" +
                    "## 响应式设计\n" +
                    "- 页面必须在所有设备上（手机、平板、桌面）完美展示\n" +
                    "- 针对不同屏幕尺寸优化布局和字体大小\n" +
                    "- 确保移动端有良好的触控体验\n" +
                    "## 媒体资源\n" +
                    "- 使用文档中的Markdown图片链接（如果有的话）\n" +
                    "- 使用文档中的视频嵌入代码（如果有的话）\n" +
                    "## 图标与视觉元素\n" +
                    "- 使用专业图标库如Font Awesome或Material Icons（通过CDN引入）\n" +
                    "- 根据内容主题选择合适的插图或图表展示数据\n" +
                    "- 避免使用emoji作为主要图标\n" +
                    "## 交互体验\n" +
                    "- 添加适当的微交互效果提升用户体验：    \n" +
                    " * 按钮悬停时有轻微放大和颜色变化    \n" +
                    " * 卡片元素悬停时有精致的阴影和边框效果    \n" +
                    " * 页面滚动时有平滑过渡效果    \n" +
                    " * 内容区块加载时有优雅的淡入动画\n" +
                    "## 性能优化\n" +
                    "- 确保页面加载速度快，避免不必要的大型资源\n" +
                    "- 实现懒加载技术用于长页面内容\n" +
                    "## 输出要求\n" +
                    "- 提供完整可运行的单一HTML文件，包含所有必要的CSS和JavaScript\n" +
                    "- 确保代码符合W3C标准，无错误警告\n" +
                    "- 页面在不同浏览器中保持一致的外观和功能\n" +
                    "请根据上传文件的内容类型（文档、数据、图片等），创建最适合展示该内容的可视化网页。";

            // 实例化一个请求对象,每个接口都会对应一个request对象
            Message[] messages = new Message[2];
            Message message_sys = new Message();
            message_sys.setRole("system");
            message_sys.setContent(prompt);
            messages[0] = message_sys;
            ChatCompletionsRequest req = new ChatCompletionsRequest();
            req.setStream(false);
            Message message1 = new Message();
            message1.setRole("user");
            message1.setContent(message);
            messages[1] = message1;
            req.setModel("deepseek-r1");
            req.setMessages(messages);
            // 返回的resp是一个ChatCompletionsResponse的实例，与请求对象对应
            ChatCompletionsResponse resp = deepseekClient.ChatCompletions(req);
            // 输出json格式的字符串回包
            return resp.getChoices()[0].getMessage().getContent();
        } catch (TencentCloudSDKException e) {
            System.out.println(e.toString());
            log.error("AI 对话失败", e);
            throw new BusinessException(ErrorCode.OPERATION_ERROR);
        }
    }


}
