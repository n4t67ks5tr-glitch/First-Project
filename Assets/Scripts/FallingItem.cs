using UnityEngine;

public class FallingItem : MonoBehaviour
{
    public float fallSpeed = 3f;
    public bool isBomb;
    public int scoreValue = 1;
    public float destroyBelowY = -6f;

    void Update()
    {
        transform.position += Vector3.down * fallSpeed * Time.deltaTime;
        if (transform.position.y < destroyBelowY)
        {
            Destroy(gameObject);
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (!other.CompareTag("Player")) return;

        if (isBomb)
        {
            GameManager.Instance.LoseLife();
        }
        else
        {
            GameManager.Instance.AddScore(scoreValue);
        }
        Destroy(gameObject);
    }
}
