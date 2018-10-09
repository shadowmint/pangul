export class LocalAssets {
  async config() {
    const response = await fetch('/config.json');
    return response.json();
  }
}

