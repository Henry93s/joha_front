import axios from "axios";
/* 스토리 글 리스트 가져오기 */
export const fetchStoryData = async () => {
  try {
    const response = await axios.get(`/story`, {});
    return response.data;
  } catch (error) {
    console.error("스토리 글을 찾을 수 없습니다.", error);
    throw error;
  }
};

/* 스토리 삭제하기 */
export const deleteStory = async (id) => {
  try {
    const response = await axios.delete(`/story/delete`, {
      data: { nanoid: id },
    });
    return response.data;
  } catch (error) {
    console.error("스토리를 삭제하는데 실패했습니다.", error);
    throw error;
  }
};

/* 스토리 수정하기 */
export const editStoryData = async (data) => {
  try {
    await axios.put(`/story`, data, {
      // 쿠키를 포함시키기 위해 필요
    });
  } catch (error) {
    console.error("스토리를 수정하는데 실패했습니다.", error);
    throw error;
  }
};
