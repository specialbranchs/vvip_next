
export const base64_header="data:image/jpeg;base64,"
export const toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export   const toBase64replace = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let base64String = "";
        if (reader.result) {
          const rs: any = reader.result;
          base64String = rs.replace("data:", "").replace(/^.+,/, "");
        }
        resolve(base64String);
      };
      reader.onerror = reject;
    });

    export const rep=(rs:string)=>{
      return rs.replace("data:", "").replace(/^.+,/, "");
    }