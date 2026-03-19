from PIL import Image
import base64
from io import BytesIO
import os

def remove_white_bg():
    img_path = r'c:\Users\batti\OneDrive\Desktop\Farouk\Kalimtu\mark only + white bg.png'
    out_path = r'c:\Users\batti\OneDrive\Desktop\Farouk\Kalimtu\Kalimtu Ai\kalimtu-app\public\logo.svg'
    
    if not os.path.exists(img_path):
        print(f"Image not found at {img_path}")
        return

    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    
    for item in datas:
        # Distance to pure white
        # If item[0], item[1], item[2] are close to 255, it's white.
        diff = (255 - item[0]) + (255 - item[1]) + (255 - item[2])
        
        # We need a softer alpha curve to avoid jagged edges
        if diff < 15:
            newData.append((255, 255, 255, 0))
        elif diff < 120:
            # Map diff [15, 120] -> alpha [0, 255]
            alpha = int(((diff - 15) / 105) * 255)
            newData.append((item[0], item[1], item[2], alpha))
        else:
            newData.append(item)

    img.putdata(newData)

    # Crop the image to its bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    svg_content = f"""<svg viewBox="0 0 {img.width} {img.height}" xmlns="http://www.w3.org/2000/svg">
  <image width="{img.width}" height="{img.height}" href="data:image/png;base64,{img_str}"/>
</svg>"""

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    
    print("Successfully processed logo and saved to public/logo.svg")

if __name__ == "__main__":
    remove_white_bg()
