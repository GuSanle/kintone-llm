import React, { useState } from "react";
import styles from "./agent.module.css";
import { availableFunctions, functionDefinitions } from "./api/index";
import { fetchWenXin } from "./service/llm";

type FunctionAvailable = "ParseFile";
//查询
const Agent: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]); // [{role:'user',content:'xxx'},{role:'assistant',content:'xxx'}
  const system = "你是一个有用的助手。仅使用为您提供的功能";

  async function agent() {
    setInput("");
    setLoading(true);
    const newMessage = [
      ...messages,
      {
        role: "user",
        content: input,
      },
    ];

    setMessages((messages) => [
      ...messages,
      {
        role: "user",
        content: input,
      },
    ]);

    // console.log(messages, "messages");
    const chatCompletion = await fetchWenXin({
      system,
      messages: newMessage,
      functions: functionDefinitions,
    });
    const { finish_reason, function_call } = chatCompletion;
    // console.log(chatCompletion, "chatCompletion");
    console.log(function_call, "function_call");
    if (finish_reason === "function_call" && function_call) {
      const functionName = function_call.name as FunctionAvailable;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(function_call.arguments);
      const functionArgsArr = Object.values(functionArgs);
      // @ts-ignore
      const functionResponse = await functionToCall.apply(
        null,
        // @ts-ignore
        functionArgsArr
      );

      console.log(functionResponse, "formattedResponse");
      let stringResponse = JSON.stringify(
        (functionResponse as any)?.data ?? []
      );

      let htmlResponse = stringResponse.replace(/\\n/g, " ");

      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: `获取到的结果是：${htmlResponse}`,
          // content: `获取到的结果是小王23岁`,
          // function_call,
        },
      ]);
    } else if (finish_reason === "normal") {
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: chatCompletion.result,
        },
      ]);
    } else if (finish_reason === "stop") {
      setMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          content: "谢谢使用！",
        },
      ]);
    } else {
      return;
    }
    setLoading(false);
  }

  return (
    <div id={styles["chat-container"]}>
      <div id={styles["chat-log"]}>
        {messages.map((message, index) => (
          <div key={index} className={styles["message-wrapper"]}>
            <>
              {message.role === "user" ? (
                <div className={`${styles.sender} ${styles.user}`}>🙋🏼‍♂️</div>
              ) : (
                <div className={`${styles.sender} ${styles.bot}`}>🤖</div>
              )}
              <div className={styles.message}>{message.content}</div>
              <p></p>
            </>
          </div>
        ))}
      </div>
      <div className={styles.bottomElement}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button className={styles.button} onClick={agent} disabled={loading}>
          发送
        </button>
      </div>
    </div>
  );
};

export default Agent;
