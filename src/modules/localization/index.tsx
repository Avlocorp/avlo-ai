// import { AxiosError } from "axios";
// import React, { ChangeEvent, useEffect, useState } from "react";
// import { Trans } from "react-i18next";
// import { toast } from "react-toastify";

// const Localization = () => {
//   const [inputValue, setInputValue] = useState<{
//     value: string;
//     data: {
//       key: string;
//       id: number;
//       uz: string;
//     } | null;
//     changedLangCode: "uz" | "kr" | "ru" | null;
//   }>({
//     data: null,
//     value: "",
//     changedLangCode: null,
//   });

//   function handleTranslationInput(
//     e: ChangeEvent<HTMLInputElement>,
//     data: { key: string; id: number; en: string; uz: string },
//     langCode: "uz" | "kr" | "ru"
//   ) {
//     setInputValue({
//       value: e.target.value,
//       data: data,
//       changedLangCode: langCode,
//     });
//   }

//   function handleDelete(key: React.Key) {
//     api
//       .delete(`/translate/?key=${key}`)
//       .then((res) => {
//         toast.success(t("Keyword successfully has been deleted"));
//       })
//       .catch((err) => {
//         if (err instanceof AxiosError) {
//           toast.error(t(get(err, "response.data.error")));
//         }
//       });
//   }

//   useEffect(() => {
//     if (inputValue.data) {
//     }
//   }, []);

//   const count = 4;
//   const fullname = "Bekzod";

//   return (
//     <div>
//       <div className="py-4">
//         <Trans
//           i18nKey="userMessagesUnread"
//           values={{ fullname: fullname, count: count }}
//         >
//           Hello {{ fullname }}, you have {{ count }} unread message.
//         </Trans>
//       </div>

//       <div></div>
//     </div>
//   );
// };

// export default Localization;
