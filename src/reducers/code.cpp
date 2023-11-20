#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
vector<int> maxPalindrome(vector<int> salesData) {
  int n = salesData.size();
  vector<vector<int>> dp(n, vector<int>(n, 0));

  // Base case:
  for (int i = 0; i < n; i++) {
    dp[i][i] = salesData[i];
  }

  // Build the dp table:
  for (int len = 2; len <= n; len++) {
    for (int i = 0; i <= n - len; i++) {
      int j = i + len - 1;
      dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);

      if (salesData[i] == salesData[j]) {
        dp[i][j] = max(dp[i][j], dp[i + 1][j - 1] + salesData[i]);
      }
    }
  }

  // Construct the palindromic list:
  vector<int> palindromicList;
  int i = 0, j = n - 1;
  while (i < j) {
    if (dp[i + 1][j] == dp[i][j]) {
      palindromicList.push_back(salesData[i]);
      i++;
    } else if (dp[i][j - 1] == dp[i][j]) {
      palindromicList.push_back(salesData[j]);
      j--;
    } else {
      palindromicList.push_back(salesData[i]);
      palindromicList.push_back(salesData[j]);
      i++;
      j--;
    }
  }

  // If the list is odd, add the middle element:
  if (i == j) {
    palindromicList.push_back(salesData[i]);
  }

  reverse(palindromicList.begin(), palindromicList.end());
  return palindromicList;
}

int main() {
  int n;
  cin >> n;

  vector<int> salesData(n);
  for (int i = 0; i < n; i++) {
    cin >> salesData[i];
  }

  vector<int> palindromicList = maxPalindrome(salesData);

  for (int i = 0; i < palindromicList.size(); i++) {
    cout << palindromicList[i] << " ";
  }

  cout << endl;
  return 0;
}