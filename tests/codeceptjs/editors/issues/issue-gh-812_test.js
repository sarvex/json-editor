var assert = require('assert');

Feature('issues');

Scenario('GitHub issue 812 should remain fixed', async (I) => {
  I.amOnPage('issues/issue-gh-812.html');

  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '{"students":[{"name":"AAA","sessions":[{"student_name":"AAA","minutes":15},{"student_name":"AAA","minutes":15}]},{"name":"BBB","sessions":[{"student_name":"BBB","minutes":20}]},{"name":"CCC","sessions":[{"student_name":"CCC","minutes":10}]}]}');

  I.amAcceptingPopups();
  I.click('//*[@id="root.students.0"]/span[2]/button[contains(@class, "json-editor-btn-delete") and @data-i="0"]');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();

  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '{"students":[{"name":"BBB","sessions":[{"student_name":"BBB","minutes":20}]},{"name":"CCC","sessions":[{"student_name":"CCC","minutes":10}]}]}');

  I.amAcceptingPopups();
  I.click('//*[@id="root.students.0"]/span[2]/button[contains(@class, "json-editor-btn-delete") and @data-i="0"]');
  I.seeInPopup('Are you sure you want to remove this node?');
  I.acceptPopup();

  I.click('.get-value');
  value = await I.grabValueFrom('.debug');
  assert.equal(value, '{"students":[{"name":"CCC","sessions":[{"student_name":"CCC","minutes":10}]}]}');
});


