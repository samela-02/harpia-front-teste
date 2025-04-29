export const contentMarker = (content: string, imageUrl: string) => {
  return `<div class="flex flex-col items-center justify-center">
    <img class="w-full h-[120px] object-cover min-w-[200px] rounded-lg shadow-lg" src="${imageUrl}" />
  </div>`;
};
