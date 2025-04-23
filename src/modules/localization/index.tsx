import { Input, PaginationProps, Table } from "antd";
import { useDebounce } from "hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  useChangeTranslationMutation,
  useGetAllTranslationsQuery,
} from "services/api/localization";

const Localization = () => {
  const [inputValue, setInputValue] = useState<{
    value: string;
    data: Text | null;
    changedLangCode: "uz" | "ky" | "ru" | "tj" | null;
  }>({
    data: null,
    value: "",
    changedLangCode: null,
  });
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const inputValueDebounced = useDebounce(inputValue.value, 600);
  const searchValueDebounced = useDebounce(searchValue, 600);

  const { data, isLoading } = useGetAllTranslationsQuery({
    search: searchValueDebounced,
    page,
  });
  const [changeTranslate] = useChangeTranslationMutation();

  function handleTranslationInput(
    e: ChangeEvent<HTMLInputElement>,
    data: Text,
    langCode: "uz" | "ky" | "ru" | "tj" | null
  ) {
    setInputValue({
      value: e.target.value,
      data: data,
      changedLangCode: langCode,
    });
  }

  useEffect(() => {
    if (inputValue.data) {
      try {
        changeTranslate({
          key: inputValue.data.key,
          langCode: inputValue.changedLangCode || "",
          value: inputValueDebounced,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [inputValueDebounced]);

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <ChevronLeft />;
    }
    if (type === "next") {
      return <ChevronRight />;
    }
    return originalElement;
  };

  return (
    <div>
      <div className="p-4">
        <Input
          placeholder="Search"
          defaultValue={searchValue}
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </div>

      <div className="px-4">
        <Table
          dataSource={data?.data}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Key",
              dataIndex: "key",
              key: "key",
            },
            {
              title: "Uzbek",
              dataIndex: "uz",
              key: "uz",
              render: (value, data) => {
                return (
                  <div>
                    <Input
                      key={data.id + "uz"}
                      defaultValue={value}
                      onChange={(e) => {
                        handleTranslationInput(e, data, "uz");
                      }}
                    />
                  </div>
                );
              },
            },
            {
              title: "Russian",
              dataIndex: "ru",
              key: "ru",
              render: (value, data) => {
                return (
                  <div>
                    <Input
                      key={data.id + "ru"}
                      defaultValue={value}
                      onChange={(e) => {
                        handleTranslationInput(e, data, "ru");
                      }}
                    />
                  </div>
                );
              },
            },
            {
              title: "Kyrgyz",
              dataIndex: "ky",
              key: "ky",
              render: (value, data) => {
                return (
                  <div>
                    <Input
                      key={data.id + "ky"}
                      defaultValue={value}
                      onChange={(e) => {
                        handleTranslationInput(e, data, "ky");
                      }}
                    />
                  </div>
                );
              },
            },
            {
              title: "Tadjik",
              dataIndex: "tj",
              key: "tj",
              render: (value, data) => {
                return (
                  <div>
                    <Input
                      key={data.id + "tj"}
                      defaultValue={value}
                      onChange={(e) => {
                        handleTranslationInput(e, data, "tj");
                      }}
                    />
                  </div>
                );
              },
            },
          ]}
          pagination={{
            itemRender: itemRender,
            disabled: isLoading,
            position: ["bottomRight"],
            current: page,
            total: data?.all_data,
            pageSize: data?.per_page,
            showTotal: (total, range) => (
              <h1 className="text-[16px] not-italic font-normal leading-[20pxs] p-[5px] absolute left-[32px]">
                {t("Natija")} {range[1]} - {total}
              </h1>
            ),
          }}
          onChange={(page) => {
            setPage(page.current || 1);
          }}
        />
      </div>
    </div>
  );
};

export default Localization;
