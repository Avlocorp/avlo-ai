import React from "react";
import { Layout, Input, Button } from "antd";

const { Footer: AntdFooter } = Layout;

export const Footer: React.FC = () => {
    return (
        <AntdFooter
            className="fixed bottom-0  w-full right-0 flex items-center justify-between bg-[#1A1D1F] text-white p-4 z-10"
            style={{ height: "64px" }}
        >

            <Input
                placeholder="Send a message"
                className="flex-1 mr-4 bg-[#2A2D2F] text-white border-none rounded-lg"
            />

            <Button
                type="primary"
                className="bg-[#4A90E2] border-none rounded-lg"
            >
                Send
            </Button>
        </AntdFooter>
    );
};
