import { ChangeEvent, useEffect, useState } from "react";
import Sentiment, { AnalysisResult } from "sentiment";
import { Input, Center, Text } from "@chakra-ui/react";

export default function Home() {
    const [text, setText] = useState("");
    const [result, setResult] = useState<AnalysisResult>();
    const [score, setScore] = useState<"positive" | "negative" | "zero">(
        "zero"
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };
    useEffect(() => {
        const sentiment = new Sentiment();
        const res = sentiment.analyze(text);
        setResult(res);
        console.log(res);
    }, [text]);

    useEffect(() => {
        if (result) {
            if (result.score > 0) {
                setScore("positive");
            } else if (result.score < 0) {
                setScore("negative");
            } else {
                setScore("zero");
            }
        }
    }, [result]);

    return (
        // TODO: Add details of the calculation and word points.
        <Center
            height="full"
            border="black"
            borderWidth={1}
            display="flex"
            flexDir="column"
            gap={100}
        >
            {!text ? (
                <Text fontSize="3xl">
                    Write something and see if its a positive or negative.
                    According to AFINN-165
                </Text>
            ) : score === "positive" ? (
                <Text fontSize="3xl">👍</Text>
            ) : score === "negative" ? (
                <Text fontSize="3xl">👎</Text>
            ) : (
                <></>
            )}
            <Text
                fontSize="3xl"
                color={
                    score == "positive"
                        ? "green"
                        : score == "negative"
                        ? "red"
                        : "black"
                }
            >
                {text}
            </Text>
            <Input width="xl" value={text} onChange={handleChange}></Input>
        </Center>
    );
}
