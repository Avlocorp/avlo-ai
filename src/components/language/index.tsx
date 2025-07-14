import { useEffect, useState } from "react";
import { Dropdown, Button } from "antd";
import { Globe } from "lucide-react";
import i18next from "services/i18n";
import { storage } from "services";

interface LangProps {
    width?: string | number;
    height?: string | number;
}

export default function Language({ width, height }: LangProps) {
    const [language, setLanguage] = useState(
        i18next.language || storage.get("i18nextLng") || "uz"
    );

    useEffect(() => {
        const onLangChange = (lang: string) => {
            setLanguage(lang);
        };
        i18next.on("languageChanged", onLangChange);
        return () => {
            i18next.off("languageChanged", onLangChange);
        };
    }, []);

    const items = [
        { key: "uz", label: "O‘zbek" },
        { key: "en", label: "English" },
        { key: "ru", label: "Русский" },
    ];

    const handleMenuClick = async ({ key }: { key: string }) => {
        if (key !== language) {
            await i18next.changeLanguage(key);
            storage.set("i18nextLng", key);
            // event trigger qiladi setLanguage
        }
    };

    return (
        <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
            destroyPopupOnHide
        >
            <Button
                className={`h-8 flex items-center justify-center gap-2 ${width ? `w-[${width}]` : ""}`}
                style={{
                    ...(width ? { width } : {}),
                    ...(height ? { height } : {})
                }}
            >
                <Globe className="w-4 h-4" />
                <p>
                    {items.find((item) => item.key === language)?.label || "Tilni tanlang"}
                </p>
            </Button>
        </Dropdown>
    );
}
