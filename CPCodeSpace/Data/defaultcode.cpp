*FILEEXT* .cpp

#include <bits/stdc++.h>
#define endl '\n'
#define sz(X) X.size()
#define IO cin.tie(0), ios_base::sync_with_stdio(0);
#define FOR(N) for(int i=0;i<N;++i)
#define FORf(X,V,N) for(int X=V;X<N;++X)
#define FORi(X,V,N,S) for(int X=V;(S>0?X<N:X>=N);X+=S)
#define EACH(X, V) for(auto& X : V)
#define For(X, V, N) for(int X = V, Len = N, X < V; ++X)
#define All(X) X.begin(), X.end()
#define ar array
using ll = long long;
using namespace std;
#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
template<class T, class C>
using Pset = tree<T, null_type, C, rb_tree_tag, tree_order_statistics_node_update>;
template<class T, class P> inline bool umax(T& x, P y) {
	bool big; x = (big = x>y) ? x : y; return !big;
}
template<class T, class P> inline bool umin(T& x, P y) {
	bool big; x = (big = x<y) ? x : y; return !big;
}
template<class T>
istream& operator>>(istream& is, vector<T>& vt) {
	for(auto& i : vt)
		is >> i;
	return is;
}
template<class T, unsigned int N>
istream& operator>>(istream& is, array<T, N>& ary) {
	for(auto& i : ary)
		is >> i;
	return is;
}
template<class T1, class T2>
istream& operator>>(istream& is, pair<T1, T2> pr) {
	is >> pr.first >> pr.second;
	return is;
}
template<class T> void read(T& x) {
	cin >> x;
	cin.get();
}
template<class T, class ... P> void read(T& x, P& ... t) {
	cin >> x;
	read(t...);
}
template<class T> void readl(T& x) { // readline
	getline(cin, x);
}
template<class T, class ... P> void readl(T& x, P& ... t) {
	getline(cin, x);
	readl(t...);
}

template<class T> void write(T x) {
	cout << x;
}
template<class T, class ... P> void write(T x, P ... t) {
	cout << x;
	write(t...);
}
void print() { cout << '\n'; }
template<class T> void print(T x) {
	cout << x << '\n';
}
template<class T, class ... P> void print(T x, P ... t) {
	cout << x << ' ';
	print(t...);
}

#define fastIO


void solve() {
	;
}

int main() {
#ifdef fastIO
	IO;
#endif
	solve();
}
