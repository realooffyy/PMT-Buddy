let text = "";
SettingsInstance.getCategories().forEach((category) => {
	text += "<details><summary>" + category + "</summary>\n";
	SettingsInstance.getSettings()[category].forEach((setting) => {
		text += `  ● ${setting.name}: ${setting.info} <br>\n`;
	});
	text += "</details>\n";
});

console.log(text);
