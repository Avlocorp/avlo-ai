import { Input, PaginationProps, Spin, Table, ConfigProvider, theme as antdTheme } from "antd";
import { useDebounce } from "hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  useChangeTranslationMutation,
  useGetAllTranslationsQuery,
} from "services/api/localization";
import { useTheme } from "services/contexts/ThemeContext";

const Localization = () => {
  const [inputValue, setInputValue] = useState<{
    value: string;
    data: Text | null;
    changedLangCode: "uz" | "kg" | "ru" | "tj" | "en" | null;
  }>({
    data: null,
    value: "",
    changedLangCode: null,
  });
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const inputValueDebounced = useDebounce(inputValue.value, 600);
  const searchValueDebounced = useDebounce(searchValue, 600);

  const { data, isLoading } = useGetAllTranslationsQuery({
    search: searchValueDebounced,
    page,
  });
  const [changeTranslate] = useChangeTranslationMutation();

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

  function handleTranslationInput(
    e: ChangeEvent<HTMLInputElement>,
    data: Text,
    langCode: "uz" | "kg" | "ru" | "tj" | "en" | null
  ) {
    setInputValue({
      value: e.target.value,
      data: data,
      changedLangCode: langCode,
    });
  }

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

  // Theme config
  const getThemeConfig = () => {
    if (theme === "dark") {
      return {
        algorithm: antdTheme.darkAlgorithm,
        token: {
          colorPrimary: "#4338ca",
          borderRadius: 8,
          colorBgContainer: "#374151",
          colorBgElevated: "#374151",
          colorBgLayout: "#1f2937",
          colorText: "#f3f4f6",
          colorTextSecondary: "#9ca3af",
          colorBorder: "#4b5563",
        },
      };
    }
    return {
      algorithm: antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: "#4338ca",
        borderRadius: 8,
        colorBgContainer: "#ffffff",
        colorBgElevated: "#ffffff",
        colorBgLayout: "#f9fafb",
        colorText: "#111827",
        colorTextSecondary: "#6b7280",
        colorBorder: "#d1d5db",
      },
    };
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    color: theme === "dark" ? "#f3f4f6" : "#111827",
    padding: "24px",
  };

  if (isLoading) {
    return (
      <div style={{
        ...containerStyle,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider theme={getThemeConfig()}>
      <div style={containerStyle}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: theme === "dark" ? "#f3f4f6" : "#111827"
          }}>
            {t("Localization")}
          </h1>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            style={{
              maxWidth: "400px",
              height: "32px",
            }}
          />
        </div>

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
              title: "English",
              dataIndex: "en",
              key: "en",
              render: (_, data) => (
                <Input
                  key={data.id + "en"}
                  defaultValue={data.key}
                  onChange={(e) => handleTranslationInput(e, data, "en")}
                />
              ),
            },
            {
              title: "Uzbek",
              dataIndex: "uz",
              key: "uz",
              render: (value, data) => (
                <Input
                  key={data.id + "uz"}
                  defaultValue={value}
                  onChange={(e) => handleTranslationInput(e, data, "uz")}
                />
              ),
            },
            {
              title: "Russian",
              dataIndex: "ru",
              key: "ru",
              render: (value, data) => (
                <Input
                  key={data.id + "ru"}
                  defaultValue={value}
                  onChange={(e) => handleTranslationInput(e, data, "ru")}
                />
              ),
            },
            {
              title: "Kyrgyz",
              dataIndex: "kg",
              key: "kg",
              render: (value, data) => (
                <Input
                  key={data.id + "kg"}
                  defaultValue={value}
                  onChange={(e) => handleTranslationInput(e, data, "kg")}
                />
              ),
            },
            {
              title: "Tadjik",
              dataIndex: "tj",
              key: "tj",
              render: (value, data) => (
                <Input
                  key={data.id + "tj"}
                  defaultValue={value}
                  onChange={(e) => handleTranslationInput(e, data, "tj")}
                />
              ),
            },
          ]}
          pagination={{
            itemRender,
            disabled: isLoading,
            position: ["bottomRight"],
            current: page,
            total: data?.all_data,
            pageSize: data?.per_page,
            showTotal: (total, range) => (
              <span>
                {t("Natija")} {range[1]} - {total}
              </span>
            ),
            onChange: (current) => setPage(current),
          }}
        />
      </div>
    </ConfigProvider>
  );
};

export default Localization;
