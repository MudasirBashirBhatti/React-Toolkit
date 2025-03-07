// hooks/useSubmitJob.ts
import { useState } from "react";
import axios from "axios";

interface useSubmitJobProp {
  form: {};
  url: string;
}

const useSubmitJob = ({ form, url }: useSubmitJobProp) => {
  const [loading, setLoading] = useState(false);

  const submitJob = async () => {
    setLoading(true);
    const formData = new FormData();

    for (const key in form) {
      if (form[key] instanceof FileList) {
        Array.from(form[key]).forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      await toast.promise(
        axios({
          method: "post",
          url: url,
          data: formData,
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          pending: "Uploading job...",
          success: "Job posted successfully!",
          error: "Failed to post the job.",
        }
      );
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Something went wrong during the submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return { submitJob, loading };
};

export default useSubmitJob;
