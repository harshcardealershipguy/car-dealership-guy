import axios from "@/lib/axios";

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        return axios.post("/api/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }
}

export default new UploadFilesService();
