export const createResponse = ({ data, message, ok }: { data: any; message: string; ok: boolean }) => {
  return {
    data,
    message,
    ok,
  }
}
