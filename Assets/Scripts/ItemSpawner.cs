using System.Collections;
using UnityEngine;

public class ItemSpawner : MonoBehaviour
{
    public GameObject starPrefab;
    public GameObject bombPrefab;
    public float minSpawnDelay = 0.5f;
    public float maxSpawnDelay = 1.5f;
    public float minX = -4f;
    public float maxX = 4f;
    [Range(0f, 1f)] public float bombChance = 0.25f;

    void Start()
    {
        StartCoroutine(SpawnLoop());
    }

    IEnumerator SpawnLoop()
    {
        while (true)
        {
            yield return new WaitForSeconds(Random.Range(minSpawnDelay, maxSpawnDelay));
            SpawnItem();
        }
    }

    void SpawnItem()
    {
        GameObject prefab = Random.value < bombChance ? bombPrefab : starPrefab;
        float x = Random.Range(minX, maxX);
        Instantiate(prefab, new Vector3(x, transform.position.y, 0f), Quaternion.identity);
    }
}
