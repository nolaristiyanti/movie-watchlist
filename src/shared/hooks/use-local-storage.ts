"use client";

import { useEffect, useState } from "react";

// Hook ini menerima parameter :
// `key` untuk menentukan nama localStorage
// `initialValue` sebagai nilai awal
export function useLocalStorage<T>(
  // <T> adalah generic TypeScript bisa dipakai untuk tipe data apa pun : Movie[], string, boolean, dll
  key: string,
  initialValue: T
) {
  // React hanya menjalankan saat render pertama (lazy initialization)
  const [state, setState] = useState<T>(() => {
    // localStorage hanya ada di browser, Kalau di server: window undefined
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // baca localStorage, kalau ada parse JSON, kalau tidak ada pakai initialValue
      const storedValue =
        window.localStorage.getItem(key); // localStorage["movies"]

      return storedValue !== null
        ? (JSON.parse(storedValue) as T) // localStorage hanya bisa simpan string
        : initialValue;
    } catch (error) {
      console.error(error);

      return initialValue;
    }
  });

  //Setiap state berubah: simpan ke localStorage
  useEffect(() => {
    window.localStorage.setItem(
      key,
      JSON.stringify(state) // localStorage hanya bisa simpan string
    );
  }, [key, state]); // Dependency

  return [state, setState] as const;
}