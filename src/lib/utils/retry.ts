export async function retry<T>(callback: () => T, retryCount = 1): Promise<T> {
  try {
    return await callback();
  } catch (e) {
    if (retryCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await retry(callback, retryCount - 1);
    }
    throw e;
  }
}
