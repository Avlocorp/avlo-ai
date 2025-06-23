import { useState } from "react";
import { Dropdown, Button } from "antd";
import { Globe } from "lucide-react"; // yoki o'zingizning ikonka paketingiz
import i18next from "services/i18n";
import { storage } from "services";

export default function Language() {
    // Saqlangan tilni olish
    const [language, setLanguage] = useState(storage.get("i18nextLng") || "uz");

    // Menyudagi tillar
    const items = [
        { key: "uz", label: "O‘zbek" },
        { key: "en", label: "English" },
        { key: "ru", label: "Русский" },
        { key: "ky", label: "Kyrgyz" },
        { key: "tj", label: "Тоҷикӣ" }
    ];

    // Tanlangan tilni o'zgartirish
    const handleMenuClick = ({ key }: { key: string }) => {
        setLanguage(key);             // State yangilanadi
        i18next.changeLanguage(key);  // i18n ichki tilni o'zgartiradi
        storage.set("i18nextLng", key); // localStorage ga yoziladi
    };

    return (
        <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
            className="h-8 flex items-center justify-center"
        >
            <Button className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <p>
                    {
                        items.find((item) => item.key === language)?.label || "Tilni tanlang"
                    }
                </p>
            </Button>
        </Dropdown>
    );
}
