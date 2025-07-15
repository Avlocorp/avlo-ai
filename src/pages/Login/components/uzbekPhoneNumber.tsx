import { useState } from "react";

export default function UzbekPhoneInput() {
    const [phone, setPhone] = useState("+998 ");

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlar qoldiradi

        if (value.startsWith("998")) {
            value = "+" + value; // Agar 998 bilan boshlangan bo‘lsa, +998 qo‘shiladi
        } else {
            value = "+998 " + value.slice(3); // Agar boshqa raqamlar kiritilsa, 998 oldiga qo‘shiladi
        }

        // ✅ To‘g‘ri formatlash: +998 XX XXX XX XX
        if (value?.length > 4) value = value.slice(0, 4) + " " + value.slice(4);
        if (value?.length > 8) value = value.slice(0, 7) + " " + value.slice(7);
        if (value?.length > 11) value = value.slice(0, 11) + " " + value.slice(11);
        if (value?.length > 14) value = value.slice(0, 14) + " " + value.slice(14);

        setPhone(value.slice(0, 17)); // Maksimal uzunlik 17 ta belgi
    };

    return (
        <input
            type="tel"
            value={phone}
            onChange={handleInput}
            maxLength={17}
            pattern="\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}"
            className="w-full bg-[#1A1A1D] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-0"
            placeholder="+998 XX XXX XX XX"
        />
    );
}
