# Subtitle Player

The script displays subtitles from JSON files.

Just add subtitles as a hidden field to player block:
`<input type="hidden" name="sub_lang" value="YOUR_LANG_SUBTITLES.json">`

For example, add two languages:
```
<audio id="iplayer">
  <source src="math.mp3" type="audio/mpeg">  
  <input type="hidden" name="sub_lang" value="eng_sub.json">
  <input type="hidden" name="sub_lang" value="ua_sub.json">
</audio>
```
