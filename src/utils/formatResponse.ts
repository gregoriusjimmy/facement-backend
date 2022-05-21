export const formatResponse = ({ data, message, ok }: { data: any; message: string; ok: boolean }) => {
  return {
    data,
    message,
    ok,
  }
}
