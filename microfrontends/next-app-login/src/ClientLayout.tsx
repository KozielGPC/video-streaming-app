"use client"

import type React from "react"

import { ConfigProvider, theme } from "antd"
import { useEffect, useState } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(prefersDark)

    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
      if (e.matches) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#4f46e5",
          borderRadius: 8,
          colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
          colorText: isDarkMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)",
          colorBgElevated: isDarkMode ? "#374151" : "#ffffff",
          colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
        },
        components: {
          Button: {
            colorPrimaryHover: "#4338ca",
            colorPrimaryActive: "#3730a3",
          },
          Input: {
            colorBgContainer: isDarkMode ? "#1f2937" : "#ffffff",
            colorBorder: isDarkMode ? "#374151" : "#d9d9d9",
          },
          Card: {
            colorBgContainer: isDarkMode ? "#111827" : "#ffffff",
          },
          Checkbox: {
            colorPrimary: "#4f46e5",
          },
          Divider: {
            colorSplit: isDarkMode ? "#374151" : "#f0f0f0",
            colorTextDescription: isDarkMode ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.45)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

